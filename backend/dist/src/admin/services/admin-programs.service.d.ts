import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    listPrograms(): Promise<({
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
    getProgram(id: string): Promise<{
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
    createProgram(data: {
        title: string;
        slug: string;
        description?: string;
        bannerUrl?: string;
        awardTitle?: string;
        durationWeeks?: number;
        accreditationBody?: string;
        isFeatured?: boolean;
        isPublished?: boolean;
        courseIds?: {
            courseId: string;
            order: number;
        }[];
    }): Promise<{
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
    updateProgram(id: string, data: any): Promise<{
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
    deleteProgram(id: string): Promise<{
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
    togglePublished(id: string): Promise<{
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
