import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  /** Get quiz for a learner — correct answers stripped */
  async getQuizForLearner(quizId: string, userId: string, courseId: string) {
    // Verify enrollment
    const enrolled = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrolled) throw new ForbiddenException('Not enrolled in this course');

    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            // Never send isCorrect to learners
            options: {
              orderBy: { order: 'asc' },
              select: { id: true, optionText: true, order: true },
            },
          },
        },
      },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // Check attempts used
    const attemptsUsed = await this.prisma.quizAttempt.count({
      where: { userId, quizId },
    });

    return {
      ...quiz,
      attemptsUsed,
      attemptsRemaining: quiz.maxAttempts - attemptsUsed,
    };
  }

  /** Submit answers, grade server-side, store attempt */
  async submitQuiz(
    userId: string,
    quizId: string,
    courseId: string,
    answers: { questionId: string; optionId: string }[],
  ) {
    // Verify enrollment
    const enrolled = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrolled) throw new ForbiddenException('Not enrolled in this course');

    // Fetch quiz WITH correct answers (server-side only)
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: { options: true },
        },
      },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // Check attempt limit
    const attemptsUsed = await this.prisma.quizAttempt.count({
      where: { userId, quizId },
    });
    if (attemptsUsed >= quiz.maxAttempts) {
      throw new BadRequestException(
        `Maximum ${quiz.maxAttempts} attempts reached for this quiz`,
      );
    }

    // Grade
    let totalMarks = 0;
    let earnedMarks = 0;
    const gradedAnswers: any[] = [];

    for (const question of quiz.questions) {
      totalMarks += question.marks;
      const submitted = answers.find((a) => a.questionId === question.id);
      const selectedOption = question.options.find(
        (o) => o.id === submitted?.optionId,
      );
      const correctOption = question.options.find((o) => o.isCorrect);
      const isCorrect = !!selectedOption?.isCorrect;
      if (isCorrect) earnedMarks += question.marks;

      gradedAnswers.push({
        questionId: question.id,
        questionText: question.questionText,
        optionId: submitted?.optionId || null,
        isCorrect,
        correctOptionId: correctOption?.id,
        correctOptionText: correctOption?.optionText,
        explanation: question.explanation,
      });
    }

    const score = totalMarks > 0 ? (earnedMarks / totalMarks) * 100 : 0;
    const passed = score >= quiz.passMarkPercentage;

    const attempt = await this.prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        answers: gradedAnswers,
        score,
        passed,
        attemptNumber: attemptsUsed + 1,
        submittedAt: new Date(),
      },
    });

    return {
      attemptId: attempt.id,
      score: Math.round(score),
      passed,
      passMark: quiz.passMarkPercentage,
      attemptNumber: attempt.attemptNumber,
      attemptsRemaining: quiz.maxAttempts - attempt.attemptNumber,
      answers: gradedAnswers,
    };
  }

  async getMyAttempts(userId: string, quizId: string) {
    return this.prisma.quizAttempt.findMany({
      where: { userId, quizId },
      orderBy: { startedAt: 'desc' },
    });
  }
}
