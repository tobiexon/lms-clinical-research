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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    getCatalog(page = '1', limit = '12', category, difficulty, search) {
        return this.coursesService.getCatalog({
            page: parseInt(page),
            limit: parseInt(limit),
            category,
            difficulty,
            search,
        });
    }
    getFeatured() {
        return this.coursesService.getFeaturedCourses(6);
    }
    getCategories() {
        return this.coursesService.getCategories();
    }
    getCourse(slug) {
        return this.coursesService.getCourseBySlug(slug);
    }
    getLearnContent(slug) {
        return this.coursesService.getCourseBySlug(slug);
    }
    getLesson(id) {
        return this.coursesService.getLessonById(id);
    }
    getModule(id) {
        return this.coursesService.getModuleById(id);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('difficulty')),
    __param(4, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCatalog", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getFeatured", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':slug/learn'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getLearnContent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('lesson/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getLesson", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('module/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getModule", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map