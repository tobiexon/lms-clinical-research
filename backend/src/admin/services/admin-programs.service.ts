import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminProgramsService {
  constructor(private prisma: PrismaService) {}

  async listPrograms() {
    return this.prisma.program.findMany({
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
      include: {
        courses: {
          orderBy: { order: 'asc' },
          include: { course: { select: { id: true, title: true, slug: true } } },
        },
      },
    });
  }

  async getProgram(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        courses: {
          orderBy: { order: 'asc' },
          include: { course: true },
        },
      },
    });
    if (!program) throw new NotFoundException('Program not found');
    return program;
  }

  async createProgram(data: {
    title: string;
    slug: string;
    description?: string;
    bannerUrl?: string;
    awardTitle?: string;
    durationWeeks?: number;
    accreditationBody?: string;
    isFeatured?: boolean;
    isPublished?: boolean;
    courseIds?: { courseId: string; order: number }[];
  }) {
    const { courseIds, ...programData } = data;

    return this.prisma.program.create({
      data: {
        ...programData,
        courses: courseIds?.length
          ? { create: courseIds.map((c) => ({ courseId: c.courseId, order: c.order })) }
          : undefined,
      },
      include: { courses: { include: { course: true } } },
    });
  }

  async updateProgram(id: string, data: any) {
    const { courseIds, ...programData } = data;

    if (courseIds !== undefined) {
      await this.prisma.programCourse.deleteMany({ where: { programId: id } });
      if (courseIds.length > 0) {
        await this.prisma.programCourse.createMany({
          data: courseIds.map((c: any) => ({ programId: id, courseId: c.courseId, order: c.order })),
        });
      }
    }

    return this.prisma.program.update({
      where: { id },
      data: programData,
      include: { courses: { include: { course: true } } },
    });
  }

  async deleteProgram(id: string) {
    return this.prisma.program.delete({ where: { id } });
  }

  async togglePublished(id: string) {
    const program = await this.prisma.program.findUnique({ where: { id } });
    if (!program) throw new NotFoundException('Program not found');
    return this.prisma.program.update({
      where: { id },
      data: { isPublished: !program.isPublished },
    });
  }
}
