import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';
import { AskTutorDto } from './tutor.dto';

// ─── Naive HTML → plain text stripper ────────────────────────────────────────
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|h[1-6]|tr|td|th|blockquote|pre)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ─── Extract plain text from lesson content (JSON or string) ─────────────────
function extractLessonText(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') return stripHtml(content);
  // Handle Prisma Json field — may be stored as { html: '...' }
  if (typeof content === 'object' && content !== null) {
    const obj = content as Record<string, unknown>;
    if (typeof obj.html === 'string') return stripHtml(obj.html);
    if (typeof obj.text === 'string') return obj.text;
    return JSON.stringify(content).slice(0, 8000);
  }
  return '';
}

// Cap context to ~6 000 chars so we stay well within the model's context window
const MAX_CONTEXT_CHARS = 6000;

@Injectable()
export class TutorService {
  private openai: OpenAI | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async ask(dto: AskTutorDto, userId: string): Promise<{ answer: string }> {
    // 1. Validate OpenAI is configured
    if (!this.openai) {
      throw new InternalServerErrorException(
        'AI Tutor is not configured. Please contact support.',
      );
    }

    // 2. Load lesson and its course
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: dto.lessonId },
      include: {
        module: {
          include: {
            course: { select: { id: true, slug: true, title: true } },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found.');
    }

    const course = lesson.module.course;

    // 3. Verify the user is enrolled in this course
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId: course.id },
      },
    });

    if (!enrollment) {
      throw new BadRequestException(
        'You must be enrolled in this course to use the AI Tutor.',
      );
    }

    // 4. Build context from lesson content
    const rawText = extractLessonText(lesson.content);
    const context = rawText.slice(0, MAX_CONTEXT_CHARS);

    const lessonTitle = lesson.title;
    const moduleTitle = lesson.module.title;
    const courseTitle = course.title;

    // 5. Build the system prompt
    const systemPrompt = `You are an expert AI tutor for the course "${courseTitle}".
You are currently helping a learner who is studying the lesson "${lessonTitle}" in module "${moduleTitle}".

Your role:
- Answer questions based on the lesson content provided below
- Explain concepts clearly using plain language appropriate for the learner's level
- Reference specific information from the lesson when answering
- If the question is not covered by the lesson content, say so and provide a general accurate answer
- Keep answers concise but complete — typically 150–350 words
- Use bullet points or numbered lists when explaining steps or multiple concepts
- Do NOT invent facts or make up information not supported by the lesson or your training data

LESSON CONTENT:
---
${context || 'No structured lesson content available — answer from your general clinical research knowledge.'}
---

Respond in plain, readable prose. Do not use markdown headers (## / ###) in your answer.`;

    // 6. Call OpenAI
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: dto.question },
        ],
        max_tokens: 600,
        temperature: 0.3,
      });

      const answer =
        completion.choices[0]?.message?.content?.trim() ??
        'I was unable to generate an answer. Please try again.';

      return { answer };
    } catch (err: any) {
      const msg: string = err?.message ?? '';
      if (msg.includes('API key')) {
        throw new InternalServerErrorException(
          'AI Tutor configuration error. Please contact support.',
        );
      }
      if (msg.includes('quota') || msg.includes('rate')) {
        throw new InternalServerErrorException(
          'AI Tutor is temporarily unavailable due to usage limits. Please try again shortly.',
        );
      }
      throw new InternalServerErrorException(
        'AI Tutor encountered an error. Please try again.',
      );
    }
  }
}
