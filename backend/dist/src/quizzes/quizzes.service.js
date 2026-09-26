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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuizzesService = class QuizzesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getQuizForLearner(quizId, userId, courseId) {
        const enrolled = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });
        if (!enrolled)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    orderBy: { order: 'asc' },
                    include: {
                        options: {
                            orderBy: { order: 'asc' },
                            select: { id: true, optionText: true, order: true },
                        },
                    },
                },
            },
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        const attemptsUsed = await this.prisma.quizAttempt.count({
            where: { userId, quizId },
        });
        return {
            ...quiz,
            attemptsUsed,
            attemptsRemaining: quiz.maxAttempts - attemptsUsed,
        };
    }
    async submitQuiz(userId, quizId, courseId, answers) {
        const enrolled = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });
        if (!enrolled)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    include: { options: true },
                },
            },
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        const attemptsUsed = await this.prisma.quizAttempt.count({
            where: { userId, quizId },
        });
        if (attemptsUsed >= quiz.maxAttempts) {
            throw new common_1.BadRequestException(`Maximum ${quiz.maxAttempts} attempts reached for this quiz`);
        }
        let totalMarks = 0;
        let earnedMarks = 0;
        const gradedAnswers = [];
        for (const question of quiz.questions) {
            totalMarks += question.marks;
            const submitted = answers.find((a) => a.questionId === question.id);
            const selectedOption = question.options.find((o) => o.id === submitted?.optionId);
            const correctOption = question.options.find((o) => o.isCorrect);
            const isCorrect = !!selectedOption?.isCorrect;
            if (isCorrect)
                earnedMarks += question.marks;
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
    async getMyAttempts(userId, quizId) {
        return this.prisma.quizAttempt.findMany({
            where: { userId, quizId },
            orderBy: { startedAt: 'desc' },
        });
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map