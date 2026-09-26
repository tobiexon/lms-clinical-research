import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminCoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory(data: {
        name: string;
        slug: string;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        description: string | null;
        iconUrl: string | null;
    }>;
    updateCategory(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        description: string | null;
        iconUrl: string | null;
    }>;
    deleteCategory(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        description: string | null;
        iconUrl: string | null;
    }>;
    listCategories(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        description: string | null;
        iconUrl: string | null;
    }[]>;
    listCourses(): Promise<({
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
    })[]>;
    getCourse(id: string): Promise<{
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
                        isCorrect: boolean;
                        questionId: string;
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
    createCourse(data: {
        title: string;
        slug: string;
        subtitle?: string;
        description?: any;
        learningObjectives?: string[];
        prerequisites?: string[];
        thumbnailUrl?: string;
        promoVideoUrl?: string;
        difficultyLevel?: string;
        durationHours?: number;
        language?: string;
        targetAudience?: string[];
        accreditation?: string;
        tags?: string[];
        isFeatured?: boolean;
        isPublished?: boolean;
        seoTitle?: string;
        seoDescription?: string;
        categoryId?: string;
        instructorIds?: string[];
    }): Promise<{
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
    }>;
    updateCourse(id: string, data: any): Promise<{
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
    }>;
    deleteCourse(id: string): Promise<{
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
    togglePublished(id: string): Promise<{
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
    createModule(courseId: string, data: {
        title: string;
        description?: string;
        order?: number;
        isMandatory?: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        courseId: string;
        order: number;
        isMandatory: boolean;
    }>;
    updateModule(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        courseId: string;
        order: number;
        isMandatory: boolean;
    }>;
    deleteModule(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        courseId: string;
        order: number;
        isMandatory: boolean;
    }>;
    createLesson(moduleId: string, data: {
        title: string;
        lessonType?: string;
        content?: any;
        videoUrl?: string;
        videoDurationMinutes?: number;
        pdfUrl?: string;
        downloadableResources?: any;
        isPreview?: boolean;
        order?: number;
    }): Promise<{
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
    updateLesson(id: string, data: any): Promise<{
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
    deleteLesson(id: string): Promise<{
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
    createQuiz(moduleId: string, data: {
        title: string;
        instructions?: string;
        passMarkPercentage?: number;
        timeLimitMinutes?: number;
        maxAttempts?: number;
        randomizeQuestions?: boolean;
    }): Promise<{
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
    updateQuiz(id: string, data: any): Promise<{
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
    deleteQuiz(id: string): Promise<{
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
    createQuestion(quizId: string, data: {
        questionText: string;
        questionType?: string;
        explanation?: string;
        marks?: number;
        order?: number;
        options: {
            optionText: string;
            isCorrect: boolean;
            order?: number;
        }[];
    }): Promise<{
        options: {
            id: string;
            order: number;
            optionText: string;
            isCorrect: boolean;
            questionId: string;
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
    }>;
    updateQuestion(id: string, data: any): Promise<{
        options: {
            id: string;
            order: number;
            optionText: string;
            isCorrect: boolean;
            questionId: string;
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
    }>;
    deleteQuestion(id: string): Promise<{
        id: string;
        createdAt: Date;
        order: number;
        questionText: string;
        questionType: import(".prisma/client").$Enums.QuestionType;
        explanation: string | null;
        marks: number;
        quizId: string;
    }>;
}
