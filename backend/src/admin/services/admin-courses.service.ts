import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminCoursesService {
  constructor(private prisma: PrismaService) {}

  // ── Categories ──────────────────────────────────────────────

  async createCategory(data: { name: string; slug: string; description?: string }) {
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: string, data: any) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }

  async listCategories() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  // ── Courses ─────────────────────────────────────────────────

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

  async getCourse(id: string) {
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
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async createCourse(data: {
    title: string;
    slug: string;
    subtitle?: string;
    description?: any;
    learningObjectives?: string[];
    prerequisites?: string[];
    thumbnailUrl?: string;
    promoVideoUrl?: string;
    difficultyLevel?: string;
    durationHours?: number;
    language?: string;
    targetAudience?: string[];
    accreditation?: string;
    tags?: string[];
    isFeatured?: boolean;
    isPublished?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    categoryId?: string;
    instructorIds?: string[];
  }) {
    const { instructorIds, ...courseData } = data;

    const course = await this.prisma.course.create({
      data: {
        ...courseData,
        difficultyLevel: (courseData.difficultyLevel?.toUpperCase() as any) || 'BEGINNER',
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

  async updateCourse(id: string, data: any) {
    const { instructorIds, ...courseData } = data;

    if (instructorIds !== undefined) {
      // Replace all instructors
      await this.prisma.courseInstructor.deleteMany({ where: { courseId: id } });
      if (instructorIds.length > 0) {
        await this.prisma.courseInstructor.createMany({
          data: instructorIds.map((instructorId: string) => ({ courseId: id, instructorId })),
        });
      }
    }

    return this.prisma.course.update({
      where: { id },
      data: courseData,
      include: { category: true, instructors: { include: { instructor: true } } },
    });
  }

  async deleteCourse(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }

  async togglePublished(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return this.prisma.course.update({
      where: { id },
      data: { isPublished: !course.isPublished },
    });
  }

  // ── Modules ─────────────────────────────────────────────────

  async createModule(courseId: string, data: { title: string; description?: string; order?: number; isMandatory?: boolean }) {
    return this.prisma.module.create({
      data: { ...data, courseId },
    });
  }

  async updateModule(id: string, data: any) {
    return this.prisma.module.update({ where: { id }, data });
  }

  async deleteModule(id: string) {
    return this.prisma.module.delete({ where: { id } });
  }

  // ── Lessons ─────────────────────────────────────────────────

  async createLesson(moduleId: string, data: {
    title: string;
    lessonType?: string;
    content?: any;
    videoUrl?: string;
    videoDurationMinutes?: number;
    pdfUrl?: string;
    downloadableResources?: any;
    isPreview?: boolean;
    order?: number;
  }) {
    return this.prisma.lesson.create({
      data: {
        ...data,
        moduleId,
        lessonType: (data.lessonType?.toUpperCase() as any) || 'TEXT',
      },
    });
  }

  async updateLesson(id: string, data: any) {
    return this.prisma.lesson.update({ where: { id }, data });
  }

  async deleteLesson(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }

  // ── Quizzes ──────────────────────────────────────────────────

  async createQuiz(moduleId: string, data: {
    title: string;
    instructions?: string;
    passMarkPercentage?: number;
    timeLimitMinutes?: number;
    maxAttempts?: number;
    randomizeQuestions?: boolean;
  }) {
    return this.prisma.quiz.create({ data: { ...data, moduleId } });
  }

  async updateQuiz(id: string, data: any) {
    return this.prisma.quiz.update({ where: { id }, data });
  }

  async deleteQuiz(id: string) {
    return this.prisma.quiz.delete({ where: { id } });
  }

  // ── Quiz Questions ───────────────────────────────────────────

  async createQuestion(quizId: string, data: {
    questionText: string;
    questionType?: string;
    explanation?: string;
    marks?: number;
    order?: number;
    options: { optionText: string; isCorrect: boolean; order?: number }[];
  }) {
    const { options, ...qData } = data;
    return this.prisma.quizQuestion.create({
      data: {
        ...qData,
        quizId,
        questionType: (qData.questionType?.toUpperCase() as any) || 'MULTIPLE_CHOICE',
        options: { create: options },
      },
      include: { options: true },
    });
  }

  async updateQuestion(id: string, data: any) {
    const { options, ...qData } = data;

    if (options !== undefined) {
      await this.prisma.quizOption.deleteMany({ where: { questionId: id } });
      await this.prisma.quizOption.createMany({
        data: options.map((o: any) => ({ ...o, questionId: id })),
      });
    }

    return this.prisma.quizQuestion.update({
      where: { id },
      data: qData,
      include: { options: true },
    });
  }

  async deleteQuestion(id: string) {
    return this.prisma.quizQuestion.delete({ where: { id } });
  }
}
