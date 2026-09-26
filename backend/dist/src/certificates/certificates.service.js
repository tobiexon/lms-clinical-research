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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CertificatesService = class CertificatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async issueCertificate(userId, courseId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
            include: { course: true },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        if (enrollment.status !== 'COMPLETED') {
            throw new common_1.BadRequestException('Course not yet completed');
        }
        const existing = await this.prisma.certificate.findFirst({
            where: { userId, enrollment: { courseId } },
        });
        if (existing)
            return existing;
        return this.prisma.certificate.create({
            data: {
                userId,
                enrollmentId: enrollment.id,
                courseTitle: enrollment.course.title,
            },
        });
    }
    async getUserCertificates(userId) {
        return this.prisma.certificate.findMany({
            where: { userId },
            orderBy: { issuedAt: 'desc' },
        });
    }
    async verifyCertificate(verificationCode) {
        const cert = await this.prisma.certificate.findUnique({
            where: { verificationCode },
            include: {
                user: { select: { firstName: true, lastName: true } },
            },
        });
        if (!cert)
            throw new common_1.NotFoundException('Certificate not found or invalid code');
        return {
            valid: true,
            learnerName: `${cert.user.firstName} ${cert.user.lastName}`,
            courseTitle: cert.courseTitle,
            issuedAt: cert.issuedAt,
            verificationCode: cert.verificationCode,
        };
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map