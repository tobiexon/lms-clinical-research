import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminUsersService {
    private prisma;
    constructor(prisma: PrismaService);
    listUsers(page?: number, limit?: number, search?: string): Promise<{
        users: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.Role;
            country: string;
            isActive: boolean;
            createdAt: Date;
            _count: {
                enrollments: number;
                certificates: number;
            };
        }[];
        total: number;
    }>;
    updateUserRole(id: string, role: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    toggleUserActive(id: string): Promise<{
        id: string;
        email: string;
        isActive: boolean;
    }>;
}
