import { AdminInstructorsService } from '../services/admin-instructors.service';
export declare class AdminInstructorsController {
    private svc;
    constructor(svc: AdminInstructorsService);
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
    create(b: any): Promise<{
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
    update(id: string, b: any): Promise<{
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
    remove(id: string): Promise<{
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
