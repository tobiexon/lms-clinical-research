import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: string, courseId: string) {
    // Verify course exists and is published
    const course = await this.prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
    });
    if (!course) throw new NotFoundException('Course not found');

    // Check not already enrolled
    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) throw new ConflictException('You are already enrolled in this course');

    return this.prisma.enrollment.create({
      data: { userId, courseId },
      include: { course: { select: { title: true, slug: true } } },
    });
  }

  async getUserEnrollments(userId: string) {
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

    // Attach completion percentage to each enrollment
    return enrollments.map((enrollment) => {
      const totalLessons = enrollment.course.modules.reduce(
        (sum, m) => sum + m.lessons.length,
        0,
      );
      const completedLessons = enrollment.progress.filter((p) => p.isCompleted).length;
      const percentage = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

      return { ...enrollment, progressPercentage: percentage };
    });
  }

  async getEnrollment(userId: string, courseId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
      include: { progress: true },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }

  async isEnrolled(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    return !!enrollment;
  }
}
