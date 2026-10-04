import { Injectable, BadRequestException } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ContactService {
  constructor(private notifications: NotificationsService) {}

  async submit(data: { name: string; email: string; subject: string; message: string }) {
    if (!data.name?.trim() || !data.email?.trim() || !data.subject?.trim() || !data.message?.trim()) {
      throw new BadRequestException('All fields are required');
    }

    await this.notifications.sendContactFormEmail({
      name:    data.name.trim(),
      email:   data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });

    return { message: 'Your message has been sent. We will get back to you within 1 business day.' };
  }
}
