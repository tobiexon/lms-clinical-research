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
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const enrollments_service_1 = require("./enrollments.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let EnrollmentsController = class EnrollmentsController {
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    enroll(req, body) {
        return this.enrollmentsService.enroll(req.user.id, body.courseId);
    }
    getMyEnrollments(req) {
        return this.enrollmentsService.getUserEnrollments(req.user.id);
    }
    getEnrollment(req, courseId) {
        return this.enrollmentsService.getEnrollment(req.user.id, courseId);
    }
    async checkEnrolled(req, courseId) {
        const enrolled = await this.enrollmentsService.isEnrolled(req.user.id, courseId);
        return { enrolled };
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "enroll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getMyEnrollments", null);
__decorate([
    (0, common_1.Get)(':courseId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], EnrollmentsController.prototype, "getEnrollment", null);
__decorate([
    (0, common_1.Get)(':courseId/check'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "checkEnrolled", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('enrollments'),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollments.controller.js.map