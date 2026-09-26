import { ProgramsService } from './programs.service';
export declare class ProgramsController {
    private readonly programsService;
    constructor(programsService: ProgramsService);
    getAllPrograms(): Promise<({
        courses: ({
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
    getProgramBySlug(slug: string): Promise<{
        courses: ({
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
                        createdAt: Date;
                        updatedAt: Date;
                        title: string;
                        order: number;
                        lessonType: import(".prisma/client").$Enums.LessonType;
                        content: import("@prisma/client/runtime/library").JsonValue | null;
                        videoUrl: string | null;
                        videoDurationMinutes: number | null;
                        pdfUrl: string | null;
                        downloadableResources: import("@prisma/client/runtime/library").JsonValue | null;
                        isPreview: boolean;
                        moduleId: string;
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
}
