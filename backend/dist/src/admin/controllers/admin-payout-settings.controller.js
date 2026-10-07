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
exports.AdminPayoutSettingsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const super_admin_guard_1 = require("../guards/super-admin.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const payout_settings_dto_1 = require("../dto/payout-settings.dto");
const library_1 = require("@prisma/client/runtime/library");
let AdminPayoutSettingsController = class AdminPayoutSettingsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSettings() {
        const settings = await this.prisma.payoutSettings.findFirst();
        return settings ?? {
            id: null,
            stripeBankAccountLast4: null,
            stripeBankName: null,
            stripeAccountId: null,
            payoutSchedule: 'automatic',
            payoutIntervalDays: 7,
            minimumPayoutAmount: 0,
            currency: 'GBP',
            beneficiaryName: null,
            notes: null,
            updatedAt: null,
            updatedByAdminEmail: null,
        };
    }
    async getAuditLog() {
        return this.prisma.payoutSettingsAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }
    async updateSettings(dto, req) {
        const admin = req.user;
        const ip = req.ip || req.connection?.remoteAddress || 'unknown';
        const existing = await this.prisma.payoutSettings.findFirst();
        const updated = await this.prisma.payoutSettings.upsert({
            where: { id: existing?.id ?? 'singleton' },
            create: {
                id: 'singleton',
                ...(dto.stripeBankAccountLast4 !== undefined && { stripeBankAccountLast4: dto.stripeBankAccountLast4 }),
                ...(dto.stripeBankName !== undefined && { stripeBankName: dto.stripeBankName }),
                ...(dto.stripeAccountId !== undefined && { stripeAccountId: dto.stripeAccountId }),
                ...(dto.payoutSchedule !== undefined && { payoutSchedule: dto.payoutSchedule }),
                ...(dto.payoutIntervalDays !== undefined && { payoutIntervalDays: dto.payoutIntervalDays }),
                ...(dto.minimumPayoutAmount !== undefined && { minimumPayoutAmount: new library_1.Decimal(dto.minimumPayoutAmount) }),
                ...(dto.currency !== undefined && { currency: dto.currency }),
                ...(dto.beneficiaryName !== undefined && { beneficiaryName: dto.beneficiaryName }),
                ...(dto.notes !== undefined && { notes: dto.notes }),
                updatedByAdminId: admin.sub,
                updatedByAdminEmail: admin.email,
            },
            update: {
                ...(dto.stripeBankAccountLast4 !== undefined && { stripeBankAccountLast4: dto.stripeBankAccountLast4 }),
                ...(dto.stripeBankName !== undefined && { stripeBankName: dto.stripeBankName }),
                ...(dto.stripeAccountId !== undefined && { stripeAccountId: dto.stripeAccountId }),
                ...(dto.payoutSchedule !== undefined && { payoutSchedule: dto.payoutSchedule }),
                ...(dto.payoutIntervalDays !== undefined && { payoutIntervalDays: dto.payoutIntervalDays }),
                ...(dto.minimumPayoutAmount !== undefined && { minimumPayoutAmount: new library_1.Decimal(dto.minimumPayoutAmount) }),
                ...(dto.currency !== undefined && { currency: dto.currency }),
                ...(dto.beneficiaryName !== undefined && { beneficiaryName: dto.beneficiaryName }),
                ...(dto.notes !== undefined && { notes: dto.notes }),
                updatedByAdminId: admin.sub,
                updatedByAdminEmail: admin.email,
            },
        });
        const fields = Object.keys(dto);
        for (const field of fields) {
            const oldVal = existing ? String(existing[field] ?? '') : '';
            const newVal = String(dto[field] ?? '');
            if (oldVal !== newVal) {
                await this.prisma.payoutSettingsAuditLog.create({
                    data: {
                        adminId: admin.sub,
                        adminEmail: admin.email,
                        action: 'UPDATE_PAYOUT_SETTINGS',
                        fieldChanged: field,
                        oldValue: oldVal || null,
                        newValue: newVal || null,
                        ipAddress: ip,
                    },
                });
            }
        }
        return updated;
    }
};
exports.AdminPayoutSettingsController = AdminPayoutSettingsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPayoutSettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Get)('audit-log'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPayoutSettingsController.prototype, "getAuditLog", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payout_settings_dto_1.UpdatePayoutSettingsDto, Object]),
    __metadata("design:returntype", Promise)
], AdminPayoutSettingsController.prototype, "updateSettings", null);
exports.AdminPayoutSettingsController = AdminPayoutSettingsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, super_admin_guard_1.SuperAdminGuard),
    (0, common_1.Controller)('admin/payout-settings'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminPayoutSettingsController);
//# sourceMappingURL=admin-payout-settings.controller.js.map