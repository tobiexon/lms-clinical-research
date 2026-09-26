import { AdminProgramsService } from '../services/admin-programs.service';
export declare class AdminProgramsController {
    private svc;
    constructor(svc: AdminProgramsService);
    list(): Promise<({
        courses: ({
            course: {
                id: string;
                slug: string;
                title: string;
            };
        } & {
            courseId: string;
            order: number;
            programId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        title: string;
        isFeatured: boolean;
        isPublished: boolean;
        sortOrder: number;
        bannerUrl: string | null;
        awardTitle: string | null;
        durationWeeks: number | null;
        accreditationBody: string | null;
    })[]>;
    get(id: string): Promise<{
        courses: ({
            course: {
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
        } & {
            courseId: string;
            order: number;
            programId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        title: string;
        isFeatured: boolean;
        isPublished: boolean;
        sortOrder: number;
        bannerUrl: string | null;
        awardTitle: string | null;
        durationWeeks: number | null;
        accreditationBody: string | null;
    }>;
    create(b: any): Promise<{
        courses: ({
            course: {
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
        } & {
            courseId: string;
            order: number;
            programId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        title: string;
        isFeatured: boolean;
        isPublished: boolean;
        sortOrder: number;
        bannerUrl: string | null;
        awardTitle: string | null;
        durationWeeks: number | null;
        accreditationBody: string | null;
    }>;
    update(id: string, b: any): Promise<{
        courses: ({
            course: {
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
        } & {
            courseId: string;
            order: number;
            programId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        title: string;
        isFeatured: boolean;
        isPublished: boolean;
        sortOrder: number;
        bannerUrl: string | null;
        awardTitle: string | null;
        durationWeeks: number | null;
        accreditationBody: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        title: string;
        isFeatured: boolean;
        isPublished: boolean;
        sortOrder: number;
        bannerUrl: string | null;
        awardTitle: string | null;
        durationWeeks: number | null;
        accreditationBody: string | null;
    }>;
    togglePublish(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        title: string;
        isFeatured: boolean;
        isPublished: boolean;
        sortOrder: number;
        bannerUrl: string | null;
        awardTitle: string | null;
        durationWeeks: number | null;
        accreditationBody: string | null;
    }>;
}
