import { PaymentsService } from './payments.service';
import { CreatePaymentDto, CreatePaymentIntentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentIntent(dto: CreatePaymentIntentDto): Promise<{
        clientSecret: string;
        paymentIntentId: string;
        amount: number;
        currency: string;
    }>;
    processPayment(req: any, dto: CreatePaymentDto): Promise<{
        accessToken: string;
        refreshToken: string;
        paymentId: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
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
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
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
    getMyPayments(req: any): Promise<({
        items: {
            id: string;
            createdAt: Date;
            courseId: string;
            enrollmentId: string | null;
            courseTitle: string;
            courseSlug: string;
            courseCategory: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
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
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        userAgent: string | null;
        notes: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
    })[]>;
    getPayment(req: any, id: string): Promise<{
        items: {
            id: string;
            createdAt: Date;
            courseId: string;
            enrollmentId: string | null;
            courseTitle: string;
            courseSlug: string;
            courseCategory: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
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
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        userAgent: string | null;
        notes: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
    }>;
}
