import { AdminUsersService } from '../services/admin-users.service';
export declare class AdminUsersController {
    private svc;
    constructor(svc: AdminUsersService);
    list(page?: string, limit?: string, search?: string): Promise<{
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
    updateRole(id: string, body: {
        role: string;
    }): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    toggleActive(id: string): Promise<{
        id: string;
        email: string;
        isActive: boolean;
    }>;
}
