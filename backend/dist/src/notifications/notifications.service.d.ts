import { ConfigService } from '@nestjs/config';
export declare class NotificationsService {
    private config;
    private readonly logger;
    constructor(config: ConfigService);
    private get apiToken();
    private get fromEmail();
    private get fromName();
    private get frontendUrl();
    private get adminEmail();
    private send;
    sendWelcomeEmail(user: {
        email: string;
        firstName: string;
    }): Promise<void>;
    sendNewAccountWithPaymentEmail(data: {
        email: string;
        firstName: string;
        temporaryPassword: string;
        magicLoginUrl?: string;
        paymentId: string;
        totalAmount: number;
        currency: string;
        paidAt: Date;
        items: {
            courseTitle: string;
            unitPrice: number;
        }[];
    }): Promise<void>;
    sendPaymentConfirmationEmail(data: {
        email: string;
        firstName: string;
        lastName: string;
        paymentId: string;
        totalAmount: number;
        currency: string;
        paidAt: Date;
        items: {
            courseTitle: string;
            unitPrice: number;
        }[];
        magicLoginUrl?: string;
    }): Promise<void>;
    sendEnrolmentConfirmationEmail(data: {
        email: string;
        firstName: string;
        courseTitle: string;
        courseSlug: string;
    }): Promise<void>;
    sendCourseCompletionEmail(data: {
        email: string;
        firstName: string;
        courseTitle: string;
        verificationCode: string;
    }): Promise<void>;
    sendSubscriptionConfirmationEmail(email: string): Promise<void>;
    sendPasswordResetEmail(data: {
        email: string;
        firstName: string;
        resetToken: string;
    }): Promise<void>;
    sendAdminAlertEmail(subject: string, details: string): Promise<void>;
    private baseTemplate;
    private cta;
}
