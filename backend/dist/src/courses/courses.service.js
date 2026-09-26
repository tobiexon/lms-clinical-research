"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCatalog(options) {
        const { page, limit, category, difficulty, search } = options;
        const skip = (page - 1) * limit;
        const where = { isPublished: true };
        if (category)
            where.category = { slug: category };
        if (difficulty)
            where.difficultyLevel = difficulty.toUpperCase();
        if (search)
            where.title = { contains: search, mode: 'insensitive' };
        const [courses, total] = await this.prisma.$transaction([
            this.prisma.course.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
                include: {
                    category: true,
                    instructors: { include: { instructor: true } },
                    _count: { select: { modules: true, enrollments: true } },
                },
            }),
            this.prisma.course.count({ where }),
        ]);
        return { courses, total, page, limit };
    }
    async getCourseBySlug(slug) {
        const course = await this.prisma.course.findUnique({
            where: { slug },
            include: {
                category: true,
                instructors: { include: { instructor: true } },
                modules: {
                    orderBy: { order: 'asc' },
                    include: {
                        lessons: { orderBy: { order: 'asc' } },
                        quiz: {
                            include: {
                                questions: {
                                    orderBy: { order: 'asc' },
                                    include: {
                                        options: {
                                            orderBy: { order: 'asc' },
                                            select: { id: true, optionText: true, order: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                certificateTemplate: true,
            },
        });
        if (!course)
            throw new common_1.NotFoundException(`Course "${slug}" not found`);
        return course;
    }
    async getCourseById(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                category: true,
                instructors: { include: { instructor: true } },
                modules: {
                    orderBy: { order: 'asc' },
                    include: { lessons: { orderBy: { order: 'asc' } } },
                },
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async getFeaturedCourses(limit = 6) {
        return this.prisma.course.findMany({
            where: { isFeatured: true, isPublished: true },
            take: limit,
            orderBy: { sortOrder: 'asc' },
            include: {
                category: true,
                instructors: { include: { instructor: true } },
            },
        });
    }
    async getCategories() {
        return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
    }
    async getLessonById(id) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: { module: { include: { course: true } } },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        return lesson;
    }
    async getModuleById(id) {
        const module = await this.prisma.module.findUnique({
            where: { id },
            include: {
                lessons: { orderBy: { order: 'asc' } },
                quiz: {
                    include: {
                        questions: {
                            orderBy: { order: 'asc' },
                            include: {
                                options: {
                                    orderBy: { order: 'asc' },
                                    select: { id: true, optionText: true, order: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        return module;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map