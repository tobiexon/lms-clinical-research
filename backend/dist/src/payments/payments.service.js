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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const enrollments_service_1 = require("../enrollments/enrollments.service");
const notifications_service_1 = require("../notifications/notifications.service");
const library_1 = require("@prisma/client/runtime/library");
const bcrypt = require("bcrypt");
const Stripe = require("stripe");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(prisma, enrollments, notifications, jwtService, config) {
        this.prisma = prisma;
        this.enrollments = enrollments;
        this.notifications = notifications;
        this.jwtService = jwtService;
        this.config = config;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        const key = process.env.STRIPE_SECRET_KEY;
        if (key) {
            this.stripe = new Stripe(key, { apiVersion: '2026-08-26.dahlia' });
        }
        else {
            this.stripe = null;
            this.logger.warn('STRIPE_SECRET_KEY not set — Stripe integration disabled');
        }
    }
    async createPaymentIntent(dto) {
        if (!this.stripe) {
            throw new common_1.BadRequestException('Payment gateway not configured');
        }
        if (!dto.items || dto.items.length === 0) {
            throw new common_1.BadRequestException('No items in payment');
        }
        const totalPence = Math.round(dto.items.reduce((sum, item) => sum + item.unitPrice, 0) * 100);
        const intent = await this.stripe.paymentIntents.create({
            amount: totalPence,
            currency: 'gbp',
            automatic_payment_methods: { enabled: true },
            receipt_email: dto.email,
            metadata: {
                courseIds: dto.items.map((i) => i.courseId).join(','),
                courseTitles: dto.items.map((i) => i.courseTitle).join(' | ').slice(0, 500),
            },
        });
        return {
            clientSecret: intent.client_secret,
            paymentIntentId: intent.id,
            amount: totalPence,
            currency: 'gbp',
        };
    }
    async processPayment(userId, dto) {
        if (!dto.items || dto.items.length === 0) {
            throw new common_1.BadRequestException('No items in payment');
        }
        if (this.stripe && dto.gatewayReference) {
            const intent = await this.stripe.paymentIntents.retrieve(dto.gatewayReference);
            if (intent.status !== 'succeeded') {
                throw new common_1.BadRequestException(`Payment not confirmed — Stripe status: ${intent.status}`);
            }
            const charge = intent.latest_charge;
            if (charge && typeof charge === 'object' && charge.payment_method_details?.card) {
                dto.cardLast4 = charge.payment_method_details.card.last4 ?? dto.cardLast4;
                dto.cardBrand = charge.payment_method_details.card.brand ?? dto.cardBrand;
            }
        }
        else if (this.stripe && !dto.gatewayReference) {
            throw new common_1.BadRequestException('Missing Stripe payment reference');
        }
        let resolvedUserId = userId;
        let temporaryPassword;
        let isNewAccount = false;
        if (!resolvedUserId) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (existingUser) {
                resolvedUserId = existingUser.id;
            }
            else {
                temporaryPassword = this.generatePassword();
                const passwordHash = await bcrypt.hash(temporaryPassword, 12);
                const newUser = await this.prisma.user.create({
                    data: {
                        email: dto.email,
                        passwordHash,
                        firstName: dto.firstName,
                        lastName: dto.lastName,
                        role: 'LEARNER',
                        country: 'GB',
                        isEmailVerified: true,
                        paymentStatus: 'PENDING',
                    },
                });
                resolvedUserId = newUser.id;
                isNewAccount = true;
                this.logger.log(`Auto-created account for guest: ${dto.email}`);
            }
        }
        const subtotal = dto.items.reduce((sum, item) => sum + item.unitPrice, 0);
        const totalAmount = subtotal;
        this.logger.log(`Processing payment for user ${resolvedUserId} — ${dto.items.length} course(s) — £${totalAmount}`);
        const payment = await this.prisma.payment.create({
            data: {
                userId: resolvedUserId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                status: 'PENDING',
                method: 'CARD',
                currency: 'GBP',
                subtotal: new library_1.Decimal(subtotal),
                discount: new library_1.Decimal(0),
                tax: new library_1.Decimal(0),
                totalAmount: new library_1.Decimal(totalAmount),
                gatewayReference: dto.gatewayReference || null,
                cardLast4: dto.cardLast4 || null,
                cardBrand: dto.cardBrand || null,
                ipAddress: dto.ipAddress || null,
                items: {
                    create: dto.items.map((item) => ({
                        courseId: item.courseId,
                        courseTitle: item.courseTitle,
                        courseSlug: item.courseSlug,
                        courseCategory: item.courseCategory || null,
                        unitPrice: new library_1.Decimal(item.unitPrice),
                        quantity: 1,
                        lineTotal: new library_1.Decimal(item.unitPrice),
                    })),
                },
            },
            include: { items: true },
        });
        const enrollmentResults = [];
        for (const item of dto.items) {
            try {
                const enrollment = await this.enrollments.enroll(resolvedUserId, item.courseId);
                await this.prisma.paymentItem.update({
                    where: { id: payment.items.find((pi) => pi.courseId === item.courseId)?.id },
                    data: { enrollmentId: enrollment.id },
                });
                enrollmentResults.push({ courseId: item.courseId, enrollmentId: enrollment.id });
            }
            catch (err) {
                const msg = err?.message || '';
                if (msg.toLowerCase().includes('already enrolled')) {
                    this.logger.warn(`User ${resolvedUserId} already enrolled in course ${item.courseId} — skipping`);
                    enrollmentResults.push({ courseId: item.courseId, enrollmentId: null });
                }
                else {
                    this.logger.error(`Enrolment failed for course ${item.courseId}: ${msg}`);
                    enrollmentResults.push({ courseId: item.courseId, enrollmentId: null, error: msg });
                }
            }
        }
        const paidPayment = await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: 'PAID',
                paidAt: new Date(),
            },
            include: {
                items: true,
                user: {
                    select: { id: true, email: true, firstName: true, lastName: true, paymentStatus: true },
                },
            },
        });
        await this.prisma.user.update({
            where: { id: resolvedUserId },
            data: { paymentStatus: 'PAID' },
        });
        this.logger.log(`Payment ${payment.id} confirmed for user ${resolvedUserId} — status: PAID`);
        const user = await this.prisma.user.findUnique({
            where: { id: resolvedUserId },
            select: { email: true, firstName: true, lastName: true },
        });
        if (user) {
            let magicLoginUrl;
            try {
                const magicToken = await this.generateMagicToken(resolvedUserId);
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
                magicLoginUrl = `${frontendUrl}/auth/magic/${magicToken}`;
            }
            catch {
                this.logger.warn('Magic token generation failed — using plain dashboard link');
            }
            if (isNewAccount && temporaryPassword) {
                this.notifications.sendNewAccountWithPaymentEmail({
                    email: user.email,
                    firstName: user.firstName,
                    temporaryPassword,
                    magicLoginUrl,
                    paymentId: paidPayment.id,
                    totalAmount: parseFloat(paidPayment.totalAmount.toString()),
                    currency: paidPayment.currency,
                    paidAt: paidPayment.paidAt,
                    items: paidPayment.items.map((item) => ({
                        courseTitle: item.courseTitle,
                        unitPrice: parseFloat(item.unitPrice.toString()),
                    })),
                }).catch(() => { });
            }
            else {
                this.notifications.sendPaymentConfirmationEmail({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    paymentId: paidPayment.id,
                    totalAmount: parseFloat(paidPayment.totalAmount.toString()),
                    currency: paidPayment.currency,
                    paidAt: paidPayment.paidAt,
                    magicLoginUrl,
                    items: paidPayment.items.map((item) => ({
                        courseTitle: item.courseTitle,
                        unitPrice: parseFloat(item.unitPrice.toString()),
                    })),
                }).catch(() => { });
            }
            this.notifications.sendAdminPaymentNotification({
                payerName: `${user.firstName} ${user.lastName}`,
                payerEmail: user.email,
                paymentId: paidPayment.id,
                totalAmount: parseFloat(paidPayment.totalAmount.toString()),
                currency: paidPayment.currency,
                paidAt: paidPayment.paidAt,
                items: paidPayment.items.map((item) => ({
                    courseTitle: item.courseTitle,
                    unitPrice: parseFloat(item.unitPrice.toString()),
                })),
            }).catch((err) => {
                this.logger.error(`Failed to send admin payment notification: ${err?.message}`);
            });
        }
        return {
            paymentId: paidPayment.id,
            status: paidPayment.status,
            totalAmount: paidPayment.totalAmount,
            paidAt: paidPayment.paidAt,
            coursesEnrolled: enrollmentResults.filter((r) => !r.error).length,
            items: paidPayment.items,
            user: paidPayment.user,
            ...(await this.generateTokens(resolvedUserId, paidPayment.user.email, 'LEARNER')),
        };
    }
    async getUserPayments(userId) {
        return this.prisma.payment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                items: true,
            },
        });
    }
    async getPaymentById(paymentId, userId) {
        return this.prisma.payment.findFirst({
            where: { id: paymentId, userId },
            include: { items: true },
        });
    }
    async getAllPayments(page = 1, limit = 30) {
        const skip = (page - 1) * limit;
        const [payments, total] = await this.prisma.$transaction([
            this.prisma.payment.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { id: true, email: true, firstName: true, lastName: true, country: true },
                    },
                    items: true,
                },
            }),
            this.prisma.payment.count(),
        ]);
        return { payments, total };
    }
    async getPaymentStats() {
        const [totalRevenue, totalPayments, paidCount, pendingCount, refundedCount] = await this.prisma.$transaction([
            this.prisma.payment.aggregate({
                where: { status: 'PAID' },
                _sum: { totalAmount: true },
            }),
            this.prisma.payment.count(),
            this.prisma.payment.count({ where: { status: 'PAID' } }),
            this.prisma.payment.count({ where: { status: 'PENDING' } }),
            this.prisma.payment.count({ where: { status: 'REFUNDED' } }),
        ]);
        return {
            totalRevenue: totalRevenue._sum.totalAmount || 0,
            totalPayments,
            paidCount,
            pendingCount,
            refundedCount,
        };
    }
    async generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRY', '7d'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: { token: refreshToken, userId, expiresAt },
        });
        return { accessToken, refreshToken };
    }
    async generateMagicToken(userId) {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 48);
        const magic = await this.prisma.magicToken.create({
            data: { userId, expiresAt },
        });
        return magic.token;
    }
    generatePassword() {
        const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        enrollments_service_1.EnrollmentsService,
        notifications_service_1.NotificationsService,
        jwt_1.JwtService,
        config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map