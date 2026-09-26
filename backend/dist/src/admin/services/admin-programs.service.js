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
exports.AdminProgramsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminProgramsService = class AdminProgramsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async getProgram(id) {
        const program = await this.prisma.program.findUnique({
            where: { id },
            include: {
                courses: {
                    orderBy: { order: 'asc' },
                    include: { course: true },
                },
            },
        });
        if (!program)
            throw new common_1.NotFoundException('Program not found');
        return program;
    }
    async createProgram(data) {
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
    async updateProgram(id, data) {
        const { courseIds, ...programData } = data;
        if (courseIds !== undefined) {
            await this.prisma.programCourse.deleteMany({ where: { programId: id } });
            if (courseIds.length > 0) {
                await this.prisma.programCourse.createMany({
                    data: courseIds.map((c) => ({ programId: id, courseId: c.courseId, order: c.order })),
                });
            }
        }
        return this.prisma.program.update({
            where: { id },
            data: programData,
            include: { courses: { include: { course: true } } },
        });
    }
    async deleteProgram(id) {
        return this.prisma.program.delete({ where: { id } });
    }
    async togglePublished(id) {
        const program = await this.prisma.program.findUnique({ where: { id } });
        if (!program)
            throw new common_1.NotFoundException('Program not found');
        return this.prisma.program.update({
            where: { id },
            data: { isPublished: !program.isPublished },
        });
    }
};
exports.AdminProgramsService = AdminProgramsService;
exports.AdminProgramsService = AdminProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminProgramsService);
//# sourceMappingURL=admin-programs.service.js.map