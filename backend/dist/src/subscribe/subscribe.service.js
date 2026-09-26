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
var SubscribeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let SubscribeService = SubscribeService_1 = class SubscribeService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.logger = new common_1.Logger(SubscribeService_1.name);
    }
    async subscribe(dto) {
        const email = dto.email.toLowerCase().trim();
        const existing = await this.prisma.newsletterSubscriber.findUnique({
            where: { email },
        });
        if (existing) {
            if (existing.isActive) {
                this.logger.log(`Duplicate subscription attempt: ${email}`);
                return { alreadySubscribed: true };
            }
            await this.prisma.newsletterSubscriber.update({
                where: { email },
                data: {
                    isActive: true,
                    unsubscribedAt: null,
                    subscribedAt: new Date(),
                    source: dto.source ?? 'footer',
                    ipAddress: dto.ipAddress ?? null,
                },
            });
            this.logger.log(`Reactivated subscription for: ${email}`);
        }
        else {
            await this.prisma.newsletterSubscriber.create({
                data: {
                    email,
                    source: dto.source ?? 'footer',
                    ipAddress: dto.ipAddress ?? null,
                },
            });
            this.logger.log(`New subscriber: ${email}`);
        }
        this.notifications.sendSubscriptionConfirmationEmail(email).catch((err) => {
            this.logger.error(`Failed to send subscription email to ${email}: ${err?.message}`);
        });
        return { alreadySubscribed: false };
    }
    async unsubscribe(email) {
        await this.prisma.newsletterSubscriber.updateMany({
            where: { email: email.toLowerCase().trim() },
            data: { isActive: false, unsubscribedAt: new Date() },
        });
        this.logger.log(`Unsubscribed: ${email}`);
    }
    async getAllSubscribers(page = 1, limit = 50) {
        const skip = (page - 1) * limit;
        const [subscribers, total] = await this.prisma.$transaction([
            this.prisma.newsletterSubscriber.findMany({
                where: { isActive: true },
                orderBy: { subscribedAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.newsletterSubscriber.count({ where: { isActive: true } }),
        ]);
        return { subscribers, total };
    }
};
exports.SubscribeService = SubscribeService;
exports.SubscribeService = SubscribeService = SubscribeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], SubscribeService);
//# sourceMappingURL=subscribe.service.js.map