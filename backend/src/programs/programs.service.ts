import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async getAllPrograms() {
    return this.prisma.program.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
      include: {
        courses: {
          orderBy: { order: 'asc' },
          include: {
            course: {
              include: { category: true, instructors: { include: { instructor: true } } },
            },
          },
        },
      },
    });
  }

  async getProgramBySlug(slug: string) {
    const program = await this.prisma.program.findUnique({
      where: { slug },
      include: {
        courses: {
          orderBy: { order: 'asc' },
          include: {
            course: {
              include: {
                category: true,
                instructors: { include: { instructor: true } },
                modules: {
                  orderBy: { order: 'asc' },
                  include: { lessons: { orderBy: { order: 'asc' } } },
                },
              },
            },
          },
        },
      },
    });
    if (!program) throw new NotFoundException(`Program "${slug}" not found`);
    return program;
  }
}
