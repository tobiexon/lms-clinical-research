import { CertificatesService } from './certificates.service';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    verify(code: string): Promise<{
        valid: boolean;
        learnerName: string;
        courseTitle: string;
        issuedAt: Date;
        verificationCode: string;
    }>;
    getMyCertificates(req: any): Promise<{
        id: string;
        pdfUrl: string | null;
        userId: string;
        expiresAt: Date | null;
        enrollmentId: string;
        courseTitle: string;
        issuedAt: Date;
        verificationCode: string;
    }[]>;
    issue(req: any, body: {
        courseId: string;
    }): Promise<{
        id: string;
        pdfUrl: string | null;
        userId: string;
        expiresAt: Date | null;
        enrollmentId: string;
        courseTitle: string;
        issuedAt: Date;
        verificationCode: string;
    }>;
}
