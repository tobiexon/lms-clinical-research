import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminInstructorsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.instructor.findMany({ orderBy: { fullName: 'asc' } });
  }

  async create(data: {
    fullName: string;
    title: string;
    bio?: string;
    photoUrl?: string;
    linkedinUrl?: string;
    credentials?: string[];
  }) {
    return this.prisma.instructor.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.instructor.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.instructor.delete({ where: { id } });
  }
}
