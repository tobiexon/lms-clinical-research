import { QuizzesService } from './quizzes.service';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    getQuiz(req: any, id: string, courseId: string): Promise<{
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
    submit(req: any, id: string, body: {
        courseId: string;
        answers: {
            questionId: string;
            optionId: string;
        }[];
    }): Promise<{
        attemptId: string;
        score: number;
        passed: boolean;
        passMark: number;
        attemptNumber: number;
        attemptsRemaining: number;
        answers: any[];
    }>;
    getAttempts(req: any, id: string): Promise<{
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
