import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async issueCertificate(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      include: { course: true },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    if (enrollment.status !== 'COMPLETED') {
      throw new BadRequestException('Course not yet completed');
    }

    // Idempotent — return existing cert if already issued
    const existing = await this.prisma.certificate.findFirst({
      where: { userId, enrollment: { courseId } },
    });
    if (existing) return existing;

    return this.prisma.certificate.create({
      data: {
        userId,
        enrollmentId: enrollment.id,
        courseTitle: enrollment.course.title,
      },
    });
  }

  async getUserCertificates(userId: string) {
    return this.prisma.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async verifyCertificate(verificationCode: string) {
    const cert = await this.prisma.certificate.findUnique({
      where: { verificationCode },
      include: {
        user: { select: { firstName: true, lastName: true } },
      },
    });
    if (!cert) throw new NotFoundException('Certificate not found or invalid code');

    return {
      valid: true,
      learnerName: `${cert.user.firstName} ${cert.user.lastName}`,
      courseTitle: cert.courseTitle,
      issuedAt: cert.issuedAt,
      verificationCode: cert.verificationCode,
    };
  }
}
