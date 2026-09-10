import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async markLessonComplete(
    userId: string,
    courseId: string,
    lessonId: string,
    timeSpentSecs = 0,
  ) {
    // Verify enrollment
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) throw new ForbiddenException('Not enrolled in this course');

    // Verify lesson exists
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    // Upsert progress
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

    // Check if course is now fully complete
    await this.checkCourseCompletion(userId, courseId, enrollment.id);

    return progress;
  }

  async getCourseProgress(userId: string, courseId: string) {
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

    if (!enrollment) return { completedLessonIds: [], percentage: 0 };

    const allLessonIds = enrollment.course.modules.flatMap((m) =>
      m.lessons.map((l) => l.id),
    );
    const completedLessonIds = enrollment.progress
      .filter((p) => p.isCompleted)
      .map((p) => p.lessonId);

    const percentage =
      allLessonIds.length > 0
        ? Math.round((completedLessonIds.length / allLessonIds.length) * 100)
        : 0;

    return { completedLessonIds, percentage, totalLessons: allLessonIds.length };
  }

  // Auto-complete the enrollment when all lessons are done
  private async checkCourseCompletion(
    userId: string,
    courseId: string,
    enrollmentId: string,
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: { include: { lessons: { select: { id: true } } } },
      },
    });
    if (!course) return;

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
}
