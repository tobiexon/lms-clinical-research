import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async listUsers(page = 1, limit = 30, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, email: true, firstName: true, lastName: true,
          role: true, country: true, isActive: true, createdAt: true,
          _count: { select: { enrollments: true, certificates: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { users, total };
  }

  async updateUserRole(id: string, role: string) {
    return this.prisma.user.update({
      where: { id },
      data: { role: role as any },
      select: { id: true, email: true, role: true },
    });
  }

  async toggleUserActive(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user?.isActive },
      select: { id: true, email: true, isActive: true },
    });
  }
}
