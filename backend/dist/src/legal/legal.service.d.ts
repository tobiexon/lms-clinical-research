import { PrismaService } from '../prisma/prisma.service';
export declare class LegalService {
    private prisma;
    constructor(prisma: PrismaService);
    getDocument(type: 'PRIVACY_POLICY' | 'TERMS_OF_SERVICE'): Promise<{
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        type: import(".prisma/client").$Enums.LegalDocType;
        updatedBy: string | null;
    }>;
    updateDocument(type: 'PRIVACY_POLICY' | 'TERMS_OF_SERVICE', data: {
        title?: string;
        content: string;
    }, adminId?: string): Promise<{
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        type: import(".prisma/client").$Enums.LegalDocType;
        updatedBy: string | null;
    }>;
}
