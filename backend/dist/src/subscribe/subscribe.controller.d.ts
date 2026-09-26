import { SubscribeService } from './subscribe.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { Request } from 'express';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    subscribe(dto: SubscribeDto, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
