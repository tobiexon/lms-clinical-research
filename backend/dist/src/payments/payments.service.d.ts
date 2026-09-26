import { PrismaService } from '../prisma/prisma.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreatePaymentDto, CreatePaymentIntentDto } from './dto/create-payment.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class PaymentsService {
    private prisma;
    private enrollments;
    private notifications;
    private readonly logger;
    private readonly stripe;
    constructor(prisma: PrismaService, enrollments: EnrollmentsService, notifications: NotificationsService);
    createPaymentIntent(dto: CreatePaymentIntentDto): Promise<{
        clientSecret: string;
        paymentIntentId: string;
        amount: number;
        currency: string;
    }>;
    processPayment(userId: string | null, dto: CreatePaymentDto): Promise<{
        paymentId: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: Decimal;
        paidAt: Date;
        coursesEnrolled: number;
        items: {
            id: string;
            createdAt: Date;
            courseId: string;
            enrollmentId: string | null;
            courseTitle: string;
            courseSlug: string;
            courseCategory: string | null;
            unitPrice: Decimal;
            quantity: number;
            lineTotal: Decimal;
            paymentId: string;
        }[];
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        };
    }>;
    getUserPayments(userId: string): Promise<({
        items: {
            id: string;
            createdAt: Date;
            courseId: string;
            enrollmentId: string | null;
            courseTitle: string;
            courseSlug: string;
            courseCategory: string | null;
            unitPrice: Decimal;
            quantity: number;
            lineTotal: Decimal;
            paymentId: string;
        }[];
    } & {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        gatewayReference: string | null;
        cardLast4: string | null;
        cardBrand: string | null;
        ipAddress: string | null;
        method: import(".prisma/client").$Enums.PaymentMethod;
        currency: string;
        subtotal: Decimal;
        discount: Decimal;
        tax: Decimal;
        totalAmount: Decimal;
        gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        userAgent: string | null;
        notes: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
    })[]>;
    getPaymentById(paymentId: string, userId: string): Promise<{
        items: {
            id: string;
            createdAt: Date;
            courseId: string;
            enrollmentId: string | null;
            courseTitle: string;
            courseSlug: string;
            courseCategory: string | null;
            unitPrice: Decimal;
            quantity: number;
            lineTotal: Decimal;
            paymentId: string;
        }[];
    } & {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        gatewayReference: string | null;
        cardLast4: string | null;
        cardBrand: string | null;
        ipAddress: string | null;
        method: import(".prisma/client").$Enums.PaymentMethod;
        currency: string;
        subtotal: Decimal;
        discount: Decimal;
        tax: Decimal;
        totalAmount: Decimal;
        gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        userAgent: string | null;
        notes: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
    }>;
    getAllPayments(page?: number, limit?: number): Promise<{
        payments: ({
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                country: string;
            };
            items: {
                id: string;
                createdAt: Date;
                courseId: string;
                enrollmentId: string | null;
                courseTitle: string;
                courseSlug: string;
                courseCategory: string | null;
                unitPrice: Decimal;
                quantity: number;
                lineTotal: Decimal;
                paymentId: string;
            }[];
        } & {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            gatewayReference: string | null;
            cardLast4: string | null;
            cardBrand: string | null;
            ipAddress: string | null;
            method: import(".prisma/client").$Enums.PaymentMethod;
            currency: string;
            subtotal: Decimal;
            discount: Decimal;
            tax: Decimal;
            totalAmount: Decimal;
            gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
            userAgent: string | null;
            notes: string | null;
            paidAt: Date | null;
            refundedAt: Date | null;
        })[];
        total: number;
    }>;
    getPaymentStats(): Promise<{
        totalRevenue: number | Decimal;
        totalPayments: number;
        paidCount: number;
        pendingCount: number;
        refundedCount: number;
    }>;
    private generateMagicToken;
    private generatePassword;
}
