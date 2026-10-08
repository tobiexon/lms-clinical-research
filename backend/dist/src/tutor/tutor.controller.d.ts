import { TutorService } from './tutor.service';
import { AskTutorDto } from './tutor.dto';
export declare class TutorController {
    private readonly tutorService;
    constructor(tutorService: TutorService);
    ask(dto: AskTutorDto, req: any): Promise<{
        answer: string;
    }>;
}
