export declare class PaymentItemDto {
    courseId: string;
    courseTitle: string;
    courseSlug: string;
    courseCategory?: string;
    unitPrice: number;
}
export declare class CreatePaymentDto {
    firstName: string;
    lastName: string;
    email: string;
    items: PaymentItemDto[];
    gatewayReference?: string;
    cardLast4?: string;
    cardBrand?: string;
    ipAddress?: string;
}
export declare class CreatePaymentIntentDto {
    items: PaymentItemDto[];
    email: string;
}
