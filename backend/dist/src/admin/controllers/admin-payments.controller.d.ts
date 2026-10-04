import { PaymentsService } from '../../payments/payments.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminPaymentsController {
    private readonly paymentsService;
    private readonly prisma;
    constructor(paymentsService: PaymentsService, prisma: PrismaService);
    getAllPayments(page?: string, limit?: string): Promise<{
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
                courseTitle: string;
                courseSlug: string;
                courseCategory: string | null;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                quantity: number;
                lineTotal: import("@prisma/client/runtime/library").Decimal;
                enrollmentId: string | null;
                paymentId: string;
            }[];
        } & {
            id: string;
            email: string;
            ipAddress: string | null;
            userId: string;
            firstName: string;
            lastName: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            method: import(".prisma/client").$Enums.PaymentMethod;
            currency: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            gatewayReference: string | null;
            gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
            cardLast4: string | null;
            cardBrand: string | null;
            userAgent: string | null;
            notes: string | null;
            paidAt: Date | null;
            refundedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
    }>;
    getStats(): Promise<{
        totalRevenue: number | import("@prisma/client/runtime/library").Decimal;
        totalPayments: number;
        paidCount: number;
        pendingCount: number;
        refundedCount: number;
    }>;
    getPayment(id: string): import(".prisma/client").Prisma.Prisma__PaymentClient<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            country: string;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        };
        items: {
            id: string;
            createdAt: Date;
            courseId: string;
            courseTitle: string;
            courseSlug: string;
            courseCategory: string | null;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
            enrollmentId: string | null;
            paymentId: string;
        }[];
    } & {
        id: string;
        email: string;
        ipAddress: string | null;
        userId: string;
        firstName: string;
        lastName: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        method: import(".prisma/client").$Enums.PaymentMethod;
        currency: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        gatewayReference: string | null;
        gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        cardLast4: string | null;
        cardBrand: string | null;
        userAgent: string | null;
        notes: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    refundPayment(id: string, body: {
        notes?: string;
    }): Promise<{
        id: string;
        email: string;
        ipAddress: string | null;
        userId: string;
        firstName: string;
        lastName: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        method: import(".prisma/client").$Enums.PaymentMethod;
        currency: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        gatewayReference: string | null;
        gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        cardLast4: string | null;
        cardBrand: string | null;
        userAgent: string | null;
        notes: string | null;
        paidAt: Date | null;
        refundedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
