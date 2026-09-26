import { PrismaService } from '../prisma/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    markLessonComplete(userId: string, courseId: string, lessonId: string, timeSpentSecs?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        enrollmentId: string;
        lessonId: string;
        isCompleted: boolean;
        timeSpentSecs: number;
    }>;
    getCourseProgress(userId: string, courseId: string): Promise<{
        completedLessonIds: any[];
        percentage: number;
        totalLessons?: undefined;
    } | {
        completedLessonIds: string[];
        percentage: number;
        totalLessons: number;
    }>;
    private checkCourseCompletion;
}
