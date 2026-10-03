import { LegalService } from './legal.service';
export declare class LegalController {
    private svc;
    constructor(svc: LegalService);
    getPrivacyPolicy(): Promise<{
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        type: import(".prisma/client").$Enums.LegalDocType;
        updatedBy: string | null;
    }>;
    getTermsOfService(): Promise<{
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        type: import(".prisma/client").$Enums.LegalDocType;
        updatedBy: string | null;
    }>;
    updateDocument(type: string, body: {
        title?: string;
        content: string;
    }, req: any): Promise<{
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        type: import(".prisma/client").$Enums.LegalDocType;
        updatedBy: string | null;
    }>;
}
