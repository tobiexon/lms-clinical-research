import { PrismaService } from '../prisma/prisma.service';
export declare class CertificatesService {
    private prisma;
    constructor(prisma: PrismaService);
    issueCertificate(userId: string, courseId: string): Promise<{
        id: string;
        pdfUrl: string | null;
        userId: string;
        expiresAt: Date | null;
        enrollmentId: string;
        courseTitle: string;
        issuedAt: Date;
        verificationCode: string;
    }>;
    getUserCertificates(userId: string): Promise<{
        id: string;
        pdfUrl: string | null;
        userId: string;
        expiresAt: Date | null;
        enrollmentId: string;
        courseTitle: string;
        issuedAt: Date;
        verificationCode: string;
    }[]>;
    verifyCertificate(verificationCode: string): Promise<{
        valid: boolean;
        learnerName: string;
        courseTitle: string;
        issuedAt: Date;
        verificationCode: string;
    }>;
}
