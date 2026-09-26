import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Injectable()
export class SubscribeService {
  private readonly logger = new Logger(SubscribeService.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async subscribe(dto: SubscribeDto): Promise<{ alreadySubscribed: boolean }> {
    const email = dto.email.toLowerCase().trim();

    // Check if already subscribed
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        // Already active — return success silently (don't expose subscription status)
        this.logger.log(`Duplicate subscription attempt: ${email}`);
        return { alreadySubscribed: true };
      }

      // Was previously unsubscribed — reactivate
      await this.prisma.newsletterSubscriber.update({
        where: { email },
        data: {
          isActive: true,
          unsubscribedAt: null,
          subscribedAt: new Date(),
          source: dto.source ?? 'footer',
          ipAddress: dto.ipAddress ?? null,
        },
      });
      this.logger.log(`Reactivated subscription for: ${email}`);
    } else {
      // New subscriber
      await this.prisma.newsletterSubscriber.create({
        data: {
          email,
          source: dto.source ?? 'footer',
          ipAddress: dto.ipAddress ?? null,
        },
      });
      this.logger.log(`New subscriber: ${email}`);
    }

    // Send confirmation email (fire and forget — don't block the response)
    this.notifications.sendSubscriptionConfirmationEmail(email).catch((err) => {
      this.logger.error(`Failed to send subscription email to ${email}: ${err?.message}`);
    });

    return { alreadySubscribed: false };
  }

  async unsubscribe(email: string): Promise<void> {
    await this.prisma.newsletterSubscriber.updateMany({
      where: { email: email.toLowerCase().trim() },
      data: { isActive: false, unsubscribedAt: new Date() },
    });
    this.logger.log(`Unsubscribed: ${email}`);
  }

  /** Admin: list all active subscribers */
  async getAllSubscribers(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [subscribers, total] = await this.prisma.$transaction([
      this.prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
        orderBy: { subscribedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    ]);
    return { subscribers, total };
  }
}
