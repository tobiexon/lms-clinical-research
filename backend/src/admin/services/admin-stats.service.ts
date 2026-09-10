import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminStatsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalCourses,
      totalPrograms,
      totalEnrollments,
      totalCertificates,
      recentEnrollments,
    ] = await this.prisma.$transaction([
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
}
