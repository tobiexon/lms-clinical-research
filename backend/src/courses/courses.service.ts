import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // ── Public catalog ──────────────────────────────────────────

  async getCatalog(options: {
    page: number;
    limit: number;
    category?: string;
    difficulty?: string;
    search?: string;
  }) {
    const { page, limit, category, difficulty, search } = options;
    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };
    if (category) where.category = { slug: category };
    if (difficulty) where.difficultyLevel = difficulty.toUpperCase();
    if (search) where.title = { contains: search, mode: 'insensitive' };

    const [courses, total] = await this.prisma.$transaction([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
        include: {
          category: true,
          instructors: { include: { instructor: true } },
          _count: { select: { modules: true, enrollments: true } },
        },
      }),
      this.prisma.course.count({ where }),
    ]);

    return { courses, total, page, limit };
  }

  async getCourseBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
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
                  include: {
                    options: {
                      orderBy: { order: 'asc' },
                      // Strip correct answers for public view
                      select: { id: true, optionText: true, order: true },
                    },
                  },
                },
              },
            },
          },
        },
        certificateTemplate: true,
      },
    });
    if (!course) throw new NotFoundException(`Course "${slug}" not found`);
    return course;
  }

  async getCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        instructors: { include: { instructor: true } },
        modules: {
          orderBy: { order: 'asc' },
          include: { lessons: { orderBy: { order: 'asc' } } },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async getFeaturedCourses(limit = 6) {
    return this.prisma.course.findMany({
      where: { isFeatured: true, isPublished: true },
      take: limit,
      orderBy: { sortOrder: 'asc' },
      include: {
        category: true,
        instructors: { include: { instructor: true } },
      },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  // ── Enrolled learner content (includes correct answers hidden from public) ──

  async getLessonById(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { module: { include: { course: true } } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async getModuleById(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: {
        lessons: { orderBy: { order: 'asc' } },
        quiz: {
          include: {
            questions: {
              orderBy: { order: 'asc' },
              include: {
                options: {
                  orderBy: { order: 'asc' },
                  select: { id: true, optionText: true, order: true },
                },
              },
            },
          },
        },
      },
    });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }
}
