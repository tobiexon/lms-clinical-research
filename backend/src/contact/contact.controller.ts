import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private svc: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  submit(@Body() body: { name: string; email: string; subject: string; message: string }) {
    return this.svc.submit(body);
  }
}
