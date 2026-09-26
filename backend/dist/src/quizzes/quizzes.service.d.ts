import { PrismaService } from '../prisma/prisma.service';
export declare class QuizzesService {
    private prisma;
    constructor(prisma: PrismaService);
    getQuizForLearner(quizId: string, userId: string, courseId: string): Promise<{
        attemptsUsed: number;
        attemptsRemaining: number;
        questions: ({
            options: {
                id: string;
                order: number;
                optionText: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            order: number;
            questionText: string;
            questionType: import(".prisma/client").$Enums.QuestionType;
            explanation: string | null;
            marks: number;
            quizId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        moduleId: string | null;
        instructions: string | null;
        passMarkPercentage: number;
        timeLimitMinutes: number | null;
        maxAttempts: number;
        randomizeQuestions: boolean;
    }>;
    submitQuiz(userId: string, quizId: string, courseId: string, answers: {
        questionId: string;
        optionId: string;
    }[]): Promise<{
        attemptId: string;
        score: number;
        passed: boolean;
        passMark: number;
        attemptNumber: number;
        attemptsRemaining: number;
        answers: any[];
    }>;
    getMyAttempts(userId: string, quizId: string): Promise<{
        id: string;
        quizId: string;
        userId: string;
        answers: import("@prisma/client/runtime/library").JsonValue;
        score: number;
        passed: boolean;
        attemptNumber: number;
        startedAt: Date;
        submittedAt: Date | null;
    }[]>;
}
