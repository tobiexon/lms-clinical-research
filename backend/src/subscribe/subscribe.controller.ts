import { Controller, Post, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { Request } from 'express';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  /**
   * POST /api/v1/subscribe
   * Public endpoint — no auth required.
   * Subscribes an email to the newsletter and sends a confirmation email.
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async subscribe(@Body() dto: SubscribeDto, @Req() req: Request) {
    // Capture IP for audit / duplicate detection
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      undefined;

    const result = await this.subscribeService.subscribe({ ...dto, ipAddress: ip });

    // Always return the same success shape — don't reveal if email was already subscribed
    return {
      success: true,
      message: 'You\'re subscribed! Check your inbox for a confirmation email.',
    };
  }
}
