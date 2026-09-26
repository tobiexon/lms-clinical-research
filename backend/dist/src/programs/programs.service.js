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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgramsService = class ProgramsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async getProgramBySlug(slug) {
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
        if (!program)
            throw new common_1.NotFoundException(`Program "${slug}" not found`);
        return program;
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map