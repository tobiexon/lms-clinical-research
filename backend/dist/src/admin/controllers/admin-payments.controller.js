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
exports.AdminPaymentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../guards/admin.guard");
const payments_service_1 = require("../../payments/payments.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminPaymentsController = class AdminPaymentsController {
    constructor(paymentsService, prisma) {
        this.paymentsService = paymentsService;
        this.prisma = prisma;
    }
    getAllPayments(page = '1', limit = '30') {
        return this.paymentsService.getAllPayments(parseInt(page), parseInt(limit));
    }
    getStats() {
        return this.paymentsService.getPaymentStats();
    }
    getPayment(id) {
        return this.prisma.payment.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true, email: true, firstName: true,
                        lastName: true, country: true, paymentStatus: true,
                    },
                },
                items: true,
            },
        });
    }
    async refundPayment(id, body) {
        const payment = await this.prisma.payment.update({
            where: { id },
            data: {
                status: 'REFUNDED',
                refundedAt: new Date(),
                notes: body.notes || 'Refunded by admin',
            },
        });
        const otherPaid = await this.prisma.payment.count({
            where: { userId: payment.userId, status: 'PAID' },
        });
        if (otherPaid === 0) {
            await this.prisma.user.update({
                where: { id: payment.userId },
                data: { paymentStatus: 'REFUNDED' },
            });
        }
        return payment;
    }
};
exports.AdminPaymentsController = AdminPaymentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminPaymentsController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminPaymentsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminPaymentsController.prototype, "getPayment", null);
__decorate([
    (0, common_1.Patch)(':id/refund'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminPaymentsController.prototype, "refundPayment", null);
exports.AdminPaymentsController = AdminPaymentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Controller)('admin/payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService,
        prisma_service_1.PrismaService])
], AdminPaymentsController);
//# sourceMappingURL=admin-payments.controller.js.map