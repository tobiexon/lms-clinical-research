import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<{
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
    updateMe(req: any, body: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        country: string;
        timezone: string;
    }>;
}
