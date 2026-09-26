import { PrismaService } from '../prisma/prisma.service';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    getCatalog(options: {
        page: number;
        limit: number;
        category?: string;
        difficulty?: string;
        search?: string;
    }): Promise<{
        courses: ({
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
            _count: {
                enrollments: number;
                modules: number;
            };
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
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getCourseBySlug(slug: string): Promise<{
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
            quiz: {
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
            } & {
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
            };
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
        certificateTemplate: {
            id: string;
            courseId: string;
            heading: string;
            bodyText: string | null;
            signatureName: string | null;
            signatureTitle: string | null;
            logoUrl: string | null;
            backgroundUrl: string | null;
        };
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
    }>;
    getCourseById(id: string): Promise<{
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
    }>;
    getFeaturedCourses(limit?: number): Promise<({
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
    })[]>;
    getCategories(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        description: string | null;
        iconUrl: string | null;
    }[]>;
    getLessonById(id: string): Promise<{
        module: {
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            courseId: string;
            order: number;
            isMandatory: boolean;
        };
    } & {
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
    }>;
    getModuleById(id: string): Promise<{
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
        quiz: {
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
        } & {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        courseId: string;
        order: number;
        isMandatory: boolean;
    }>;
}
