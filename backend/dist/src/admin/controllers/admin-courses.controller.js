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
exports.AdminCoursesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../guards/admin.guard");
const admin_courses_service_1 = require("../services/admin-courses.service");
let AdminCoursesController = class AdminCoursesController {
    constructor(svc) {
        this.svc = svc;
    }
    listCategories() { return this.svc.listCategories(); }
    createCategory(b) { return this.svc.createCategory(b); }
    updateCategory(id, b) { return this.svc.updateCategory(id, b); }
    deleteCategory(id) { return this.svc.deleteCategory(id); }
    listCourses() { return this.svc.listCourses(); }
    getCourse(id) { return this.svc.getCourse(id); }
    createCourse(b) { return this.svc.createCourse(b); }
    updateCourse(id, b) { return this.svc.updateCourse(id, b); }
    deleteCourse(id) { return this.svc.deleteCourse(id); }
    togglePublish(id) { return this.svc.togglePublished(id); }
    createModule(courseId, b) { return this.svc.createModule(courseId, b); }
    updateModule(id, b) { return this.svc.updateModule(id, b); }
    deleteModule(id) { return this.svc.deleteModule(id); }
    createLesson(moduleId, b) { return this.svc.createLesson(moduleId, b); }
    updateLesson(id, b) { return this.svc.updateLesson(id, b); }
    deleteLesson(id) { return this.svc.deleteLesson(id); }
    createQuiz(moduleId, b) { return this.svc.createQuiz(moduleId, b); }
    updateQuiz(id, b) { return this.svc.updateQuiz(id, b); }
    deleteQuiz(id) { return this.svc.deleteQuiz(id); }
    createQuestion(quizId, b) { return this.svc.createQuestion(quizId, b); }
    updateQuestion(id, b) { return this.svc.updateQuestion(id, b); }
    deleteQuestion(id) { return this.svc.deleteQuestion(id); }
};
exports.AdminCoursesController = AdminCoursesController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "listCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Get)('courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "listCourses", null);
__decorate([
    (0, common_1.Get)('courses/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Post)('courses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Put)('courses/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)('courses/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Patch)('courses/:id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "togglePublish", null);
__decorate([
    (0, common_1.Post)('courses/:courseId/modules'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "createModule", null);
__decorate([
    (0, common_1.Put)('modules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "updateModule", null);
__decorate([
    (0, common_1.Delete)('modules/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "deleteModule", null);
__decorate([
    (0, common_1.Post)('modules/:moduleId/lessons'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Put)('lessons/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)('lessons/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Post)('modules/:moduleId/quizzes'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Put)('quizzes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "updateQuiz", null);
__decorate([
    (0, common_1.Delete)('quizzes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "deleteQuiz", null);
__decorate([
    (0, common_1.Post)('quizzes/:quizId/questions'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Put)('questions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)('questions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCoursesController.prototype, "deleteQuestion", null);
exports.AdminCoursesController = AdminCoursesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_courses_service_1.AdminCoursesService])
], AdminCoursesController);
//# sourceMappingURL=admin-courses.controller.js.map