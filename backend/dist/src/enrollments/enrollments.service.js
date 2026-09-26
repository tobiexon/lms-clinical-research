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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EnrollmentsService = class EnrollmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async enroll(userId, courseId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId, isPublished: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });
        if (existing)
            throw new common_1.ConflictException('You are already enrolled in this course');
        return this.prisma.enrollment.create({
            data: { userId, courseId },
            include: { course: { select: { title: true, slug: true } } },
        });
    }
    async getUserEnrollments(userId) {
        const enrollments = await this.prisma.enrollment.findMany({
            where: { userId },
            orderBy: { enrolledAt: 'desc' },
            include: {
                course: {
                    include: {
                        category: true,
                        instructors: { include: { instructor: true } },
                        modules: {
                            include: { lessons: { select: { id: true } } },
                        },
                    },
                },
                progress: true,
            },
        });
        return enrollments.map((enrollment) => {
            const totalLessons = enrollment.course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
            const completedLessons = enrollment.progress.filter((p) => p.isCompleted).length;
            const percentage = totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;
            return { ...enrollment, progressPercentage: percentage };
        });
    }
    async getEnrollment(userId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
            include: { progress: true },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        return enrollment;
    }
    async isEnrolled(userId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });
        return !!enrollment;
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map