import { Module } from '@nestjs/common';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
