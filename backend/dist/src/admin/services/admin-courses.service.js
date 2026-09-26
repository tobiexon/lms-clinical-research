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
exports.AdminCoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminCoursesService = class AdminCoursesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(data) {
        return this.prisma.category.create({ data });
    }
    async updateCategory(id, data) {
        return this.prisma.category.update({ where: { id }, data });
    }
    async deleteCategory(id) {
        return this.prisma.category.delete({ where: { id } });
    }
    async listCategories() {
        return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
    }
    async listCourses() {
        return this.prisma.course.findMany({
            orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
            include: {
                category: true,
                instructors: { include: { instructor: true } },
                _count: { select: { modules: true, enrollments: true } },
            },
        });
    }
    async getCourse(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
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
                                    include: { options: { orderBy: { order: 'asc' } } },
                                },
                            },
                        },
                    },
                },
                certificateTemplate: true,
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async createCourse(data) {
        const { instructorIds, ...courseData } = data;
        const course = await this.prisma.course.create({
            data: {
                ...courseData,
                difficultyLevel: courseData.difficultyLevel?.toUpperCase() || 'BEGINNER',
                instructors: instructorIds?.length
                    ? {
                        create: instructorIds.map((id) => ({ instructorId: id })),
                    }
                    : undefined,
            },
            include: { category: true, instructors: { include: { instructor: true } } },
        });
        return course;
    }
    async updateCourse(id, data) {
        const { instructorIds, ...courseData } = data;
        if (instructorIds !== undefined) {
            await this.prisma.courseInstructor.deleteMany({ where: { courseId: id } });
            if (instructorIds.length > 0) {
                await this.prisma.courseInstructor.createMany({
                    data: instructorIds.map((instructorId) => ({ courseId: id, instructorId })),
                });
            }
        }
        return this.prisma.course.update({
            where: { id },
            data: courseData,
            include: { category: true, instructors: { include: { instructor: true } } },
        });
    }
    async deleteCourse(id) {
        return this.prisma.course.delete({ where: { id } });
    }
    async togglePublished(id) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.prisma.course.update({
            where: { id },
            data: { isPublished: !course.isPublished },
        });
    }
    async createModule(courseId, data) {
        return this.prisma.module.create({
            data: { ...data, courseId },
        });
    }
    async updateModule(id, data) {
        return this.prisma.module.update({ where: { id }, data });
    }
    async deleteModule(id) {
        return this.prisma.module.delete({ where: { id } });
    }
    async createLesson(moduleId, data) {
        return this.prisma.lesson.create({
            data: {
                ...data,
                moduleId,
                lessonType: data.lessonType?.toUpperCase() || 'TEXT',
            },
        });
    }
    async updateLesson(id, data) {
        return this.prisma.lesson.update({ where: { id }, data });
    }
    async deleteLesson(id) {
        return this.prisma.lesson.delete({ where: { id } });
    }
    async createQuiz(moduleId, data) {
        return this.prisma.quiz.create({ data: { ...data, moduleId } });
    }
    async updateQuiz(id, data) {
        return this.prisma.quiz.update({ where: { id }, data });
    }
    async deleteQuiz(id) {
        return this.prisma.quiz.delete({ where: { id } });
    }
    async createQuestion(quizId, data) {
        const { options, ...qData } = data;
        return this.prisma.quizQuestion.create({
            data: {
                ...qData,
                quizId,
                questionType: qData.questionType?.toUpperCase() || 'MULTIPLE_CHOICE',
                options: { create: options },
            },
            include: { options: true },
        });
    }
    async updateQuestion(id, data) {
        const { options, ...qData } = data;
        if (options !== undefined) {
            await this.prisma.quizOption.deleteMany({ where: { questionId: id } });
            await this.prisma.quizOption.createMany({
                data: options.map((o) => ({ ...o, questionId: id })),
            });
        }
        return this.prisma.quizQuestion.update({
            where: { id },
            data: qData,
            include: { options: true },
        });
    }
    async deleteQuestion(id) {
        return this.prisma.quizQuestion.delete({ where: { id } });
    }
};
exports.AdminCoursesService = AdminCoursesService;
exports.AdminCoursesService = AdminCoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminCoursesService);
//# sourceMappingURL=admin-courses.service.js.map