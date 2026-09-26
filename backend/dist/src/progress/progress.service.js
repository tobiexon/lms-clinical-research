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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgressService = class ProgressService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async markLessonComplete(userId, courseId, lessonId, timeSpentSecs = 0) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        const progress = await this.prisma.lessonProgress.upsert({
            where: { enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId } },
            update: { isCompleted: true, timeSpentSecs, completedAt: new Date() },
            create: {
                enrollmentId: enrollment.id,
                lessonId,
                isCompleted: true,
                timeSpentSecs,
                completedAt: new Date(),
            },
        });
        await this.checkCourseCompletion(userId, courseId, enrollment.id);
        return progress;
    }
    async getCourseProgress(userId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
            include: {
                progress: true,
                course: {
                    include: {
                        modules: {
                            include: { lessons: { select: { id: true } } },
                        },
                    },
                },
            },
        });
        if (!enrollment)
            return { completedLessonIds: [], percentage: 0 };
        const allLessonIds = enrollment.course.modules.flatMap((m) => m.lessons.map((l) => l.id));
        const completedLessonIds = enrollment.progress
            .filter((p) => p.isCompleted)
            .map((p) => p.lessonId);
        const percentage = allLessonIds.length > 0
            ? Math.round((completedLessonIds.length / allLessonIds.length) * 100)
            : 0;
        return { completedLessonIds, percentage, totalLessons: allLessonIds.length };
    }
    async checkCourseCompletion(userId, courseId, enrollmentId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            include: {
                modules: { include: { lessons: { select: { id: true } } } },
            },
        });
        if (!course)
            return;
        const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
        const completedCount = await this.prisma.lessonProgress.count({
            where: { enrollmentId, isCompleted: true },
        });
        if (totalLessons > 0 && completedCount >= totalLessons) {
            await this.prisma.enrollment.update({
                where: { id: enrollmentId },
                data: { status: 'COMPLETED', completedAt: new Date() },
            });
        }
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map