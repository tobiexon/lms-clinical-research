import { AdminStatsService } from '../services/admin-stats.service';
export declare class AdminStatsController {
    private svc;
    constructor(svc: AdminStatsService);
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalCourses: number;
        totalPrograms: number;
        totalEnrollments: number;
        completedEnrollments: number;
        completionRate: number;
        totalCertificates: number;
        recentEnrollments: ({
            user: {
                email: string;
                firstName: string;
                lastName: string;
            };
            course: {
                title: string;
            };
        } & {
            id: string;
            courseId: string;
            userId: string;
            expiresAt: Date | null;
            status: import(".prisma/client").$Enums.EnrollmentStatus;
            enrolledAt: Date;
            completedAt: Date | null;
        })[];
    }>;
}
