"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminUsersService = class AdminUsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listUsers(page = 1, limit = 30, search) {
        const skip = (page - 1) * limit;
        const where = {};
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
    async updateUserRole(id, role) {
        return this.prisma.user.update({
            where: { id },
            data: { role: role },
            select: { id: true, email: true, role: true },
        });
    }
    async toggleUserActive(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return this.prisma.user.update({
            where: { id },
            data: { isActive: !user?.isActive },
            select: { id: true, email: true, isActive: true },
        });
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map