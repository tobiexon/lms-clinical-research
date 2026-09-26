import { EnrollmentsService } from './enrollments.service';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(req: any, body: {
        courseId: string;
    }): Promise<{
        course: {
            slug: string;
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
    }>;
    getMyEnrollments(req: any): Promise<{
        progressPercentage: number;
        course: {
            category: {
                id: string;
                createdAt: Date;
                name: string;
                slug: string;
                description: string | null;
                iconUrl: string | null;
            };
            instructors: ({
                instructor: {
                    id: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    fullName: string;
                    title: string;
                    bio: string | null;
                    photoUrl: string | null;
                    linkedinUrl: string | null;
                    credentials: string[];
                };
            } & {
                instructorId: string;
                courseId: string;
            })[];
            modules: ({
                lessons: {
                    id: string;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                courseId: string;
                order: number;
                isMandatory: boolean;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: import("@prisma/client/runtime/library").JsonValue | null;
            title: string;
            subtitle: string | null;
            learningObjectives: string[];
            prerequisites: string[];
            thumbnailUrl: string | null;
            promoVideoUrl: string | null;
            difficultyLevel: import(".prisma/client").$Enums.DifficultyLevel;
            durationHours: number;
            language: string;
            targetAudience: string[];
            accreditation: string | null;
            tags: string[];
            isFeatured: boolean;
            isPublished: boolean;
            seoTitle: string | null;
            seoDescription: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            originalPrice: import("@prisma/client/runtime/library").Decimal | null;
            sortOrder: number;
            categoryId: string | null;
        };
        progress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            completedAt: Date | null;
            enrollmentId: string;
            lessonId: string;
            isCompleted: boolean;
            timeSpentSecs: number;
        }[];
        id: string;
        courseId: string;
        userId: string;
        expiresAt: Date | null;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        enrolledAt: Date;
        completedAt: Date | null;
    }[]>;
    getEnrollment(req: any, courseId: string): Promise<{
        progress: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            completedAt: Date | null;
            enrollmentId: string;
            lessonId: string;
            isCompleted: boolean;
            timeSpentSecs: number;
        }[];
    } & {
        id: string;
        courseId: string;
        userId: string;
        expiresAt: Date | null;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        enrolledAt: Date;
        completedAt: Date | null;
    }>;
    checkEnrolled(req: any, courseId: string): Promise<{
        enrolled: boolean;
    }>;
}
