"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
const prisma_service_1 = require("../prisma/prisma.service");
function stripHtml(html) {
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
function extractLessonText(content) {
    if (!content)
        return '';
    if (typeof content === 'string')
        return stripHtml(content);
    if (typeof content === 'object' && content !== null) {
        const obj = content;
        if (typeof obj.html === 'string')
            return stripHtml(obj.html);
        if (typeof obj.text === 'string')
            return obj.text;
        return JSON.stringify(content).slice(0, 8000);
    }
    return '';
}
const MAX_CONTEXT_CHARS = 6000;
let TutorService = class TutorService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.openai = null;
        const apiKey = this.config.get('OPENAI_API_KEY');
        if (apiKey) {
            this.openai = new openai_1.default({ apiKey });
        }
    }
    async ask(dto, userId) {
        if (!this.openai) {
            throw new common_1.InternalServerErrorException('LMS Tutor is not configured. Please contact support.');
        }
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
            throw new common_1.NotFoundException('Lesson not found.');
        }
        const course = lesson.module.course;
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                userId_courseId: { userId, courseId: course.id },
            },
        });
        if (!enrollment) {
            throw new common_1.BadRequestException('You must be enrolled in this course to use the LMS Tutor.');
        }
        const rawText = extractLessonText(lesson.content);
        const context = rawText.slice(0, MAX_CONTEXT_CHARS);
        const lessonTitle = lesson.title;
        const moduleTitle = lesson.module.title;
        const courseTitle = course.title;
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
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: dto.question },
                ],
                max_tokens: 600,
                temperature: 0.3,
            });
            const answer = completion.choices[0]?.message?.content?.trim() ??
                'I was unable to generate an answer. Please try again.';
            return { answer };
        }
        catch (err) {
            const status = err?.status ?? err?.statusCode ?? 0;
            const msg = err?.message ?? '';
            const errorBody = err?.error ?? err?.response?.data ?? {};
            const errorType = errorBody?.error?.type ?? errorBody?.type ?? '';
            const errorCode = errorBody?.error?.code ?? errorBody?.code ?? '';
            console.error('[TutorService] OpenAI error details:', {
                status,
                message: msg,
                type: errorType,
                code: errorCode,
                raw: JSON.stringify(errorBody).slice(0, 500),
            });
            if (status === 401 || msg.toLowerCase().includes('api key') || msg.toLowerCase().includes('authentication') || errorCode === 'invalid_api_key') {
                throw new common_1.InternalServerErrorException('AI Tutor: Invalid API key. Please update OPENAI_API_KEY in Render environment variables.');
            }
            if (status === 429) {
                const isQuotaExhausted = errorCode === 'insufficient_quota' ||
                    errorType === 'insufficient_quota' ||
                    msg.toLowerCase().includes('quota') ||
                    msg.toLowerCase().includes('exceeded your current quota');
                if (isQuotaExhausted) {
                    throw new common_1.InternalServerErrorException('AI Tutor: OpenAI free credit has been used up. Please add billing at platform.openai.com/settings/billing.');
                }
                throw new common_1.InternalServerErrorException('AI Tutor: Rate limit reached. Please wait 10 seconds and try again.');
            }
            if (status === 404 || errorCode === 'model_not_found') {
                throw new common_1.InternalServerErrorException('AI Tutor: Model unavailable. Please contact support.');
            }
            throw new common_1.InternalServerErrorException(`AI Tutor error (${status || 'unknown'}): ${msg || 'Please try again.'}`);
        }
    }
};
exports.TutorService = TutorService;
exports.TutorService = TutorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], TutorService);
//# sourceMappingURL=tutor.service.js.map