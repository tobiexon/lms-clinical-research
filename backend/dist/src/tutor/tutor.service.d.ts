import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AskTutorDto } from './tutor.dto';
export declare class TutorService {
    private readonly prisma;
    private readonly config;
    private openai;
    constructor(prisma: PrismaService, config: ConfigService);
    ask(dto: AskTutorDto, userId: string): Promise<{
        answer: string;
    }>;
}
