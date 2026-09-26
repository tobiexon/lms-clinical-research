import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    markComplete(req: any, body: {
        courseId: string;
        lessonId: string;
        timeSpentSecs?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date | null;
        enrollmentId: string;
        lessonId: string;
        isCompleted: boolean;
        timeSpentSecs: number;
    }>;
    getCourseProgress(req: any, courseId: string): Promise<{
        completedLessonIds: any[];
        percentage: number;
        totalLessons?: undefined;
    } | {
        completedLessonIds: string[];
        percentage: number;
        totalLessons: number;
    }>;
}
