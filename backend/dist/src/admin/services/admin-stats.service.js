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
exports.AdminStatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminStatsService = class AdminStatsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const [totalUsers, totalCourses, totalPrograms, totalEnrollments, totalCertificates, recentEnrollments,] = await this.prisma.$transaction([
            this.prisma.user.count({ where: { role: 'LEARNER' } }),
            this.prisma.course.count(),
            this.prisma.program.count(),
            this.prisma.enrollment.count(),
            this.prisma.certificate.count(),
            this.prisma.enrollment.findMany({
                take: 10,
                orderBy: { enrolledAt: 'desc' },
                include: {
                    user: { select: { firstName: true, lastName: true, email: true } },
                    course: { select: { title: true } },
                },
            }),
        ]);
        const completedEnrollments = await this.prisma.enrollment.count({
            where: { status: 'COMPLETED' },
        });
        return {
            totalUsers,
            totalCourses,
            totalPrograms,
            totalEnrollments,
            completedEnrollments,
            completionRate: totalEnrollments > 0
                ? Math.round((completedEnrollments / totalEnrollments) * 100)
                : 0,
            totalCertificates,
            recentEnrollments,
        };
    }
};
exports.AdminStatsService = AdminStatsService;
exports.AdminStatsService = AdminStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminStatsService);
//# sourceMappingURL=admin-stats.service.js.map