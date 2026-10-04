import { ContactService } from './contact.service';
export declare class ContactController {
    private svc;
    constructor(svc: ContactService);
    submit(body: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }): Promise<{
        message: string;
    }>;
}
