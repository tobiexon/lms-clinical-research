import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminInstructorsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        title: string;
        bio: string | null;
        photoUrl: string | null;
        linkedinUrl: string | null;
        credentials: string[];
    }[]>;
    create(data: {
        fullName: string;
        title: string;
        bio?: string;
        photoUrl?: string;
        linkedinUrl?: string;
        credentials?: string[];
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        title: string;
        bio: string | null;
        photoUrl: string | null;
        linkedinUrl: string | null;
        credentials: string[];
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        title: string;
        bio: string | null;
        photoUrl: string | null;
        linkedinUrl: string | null;
        credentials: string[];
    }>;
    delete(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        title: string;
        bio: string | null;
        photoUrl: string | null;
        linkedinUrl: string | null;
        credentials: string[];
    }>;
}
