import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
        country: string;
        timezone: string;
        isEmailVerified: boolean;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.Role;
        country: string;
        timezone: string;
        isEmailVerified: boolean;
        isActive: boolean;
        avatarUrl: string | null;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(id: string, data: {
        firstName?: string;
        lastName?: string;
        country?: string;
        timezone?: string;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        country: string;
        timezone: string;
    }>;
}
