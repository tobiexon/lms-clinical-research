import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class SubscribeService {
    private prisma;
    private notifications;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    subscribe(dto: SubscribeDto): Promise<{
        alreadySubscribed: boolean;
    }>;
    unsubscribe(email: string): Promise<void>;
    getAllSubscribers(page?: number, limit?: number): Promise<{
        subscribers: {
            id: string;
            email: string;
            isActive: boolean;
            ipAddress: string | null;
            subscribedAt: Date;
            unsubscribedAt: Date | null;
            source: string | null;
        }[];
        total: number;
    }>;
}
