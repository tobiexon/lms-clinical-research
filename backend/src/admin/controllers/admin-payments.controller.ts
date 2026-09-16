import { Controller, Get, Patch, Param, Query, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { PaymentsService } from '../../payments/payments.service';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/payments')
export class AdminPaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly prisma: PrismaService,
  ) {}

  /** GET /api/v1/admin/payments — all payments paginated */
  @Get()
  getAllPayments(
    @Query('page') page = '1',
    @Query('limit') limit = '30',
  ) {
    return this.paymentsService.getAllPayments(parseInt(page), parseInt(limit));
  }

  /** GET /api/v1/admin/payments/stats — revenue summary */
  @Get('stats')
  getStats() {
    return this.paymentsService.getPaymentStats();
  }

  /** GET /api/v1/admin/payments/:id — single payment detail */
  @Get(':id')
  getPayment(@Param('id') id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true, email: true, firstName: true,
            lastName: true, country: true, paymentStatus: true,
          },
        },
        items: true,
      },
    });
  }

  /** PATCH /api/v1/admin/payments/:id/refund — mark as refunded */
  @Patch(':id/refund')
  async refundPayment(@Param('id') id: string, @Body() body: { notes?: string }) {
    const payment = await this.prisma.payment.update({
      where: { id },
      data: {
        status: 'REFUNDED',
        refundedAt: new Date(),
        notes: body.notes || 'Refunded by admin',
      },
    });

    // Revert user payment status if no other PAID payments exist
    const otherPaid = await this.prisma.payment.count({
      where: { userId: payment.userId, status: 'PAID' },
    });
    if (otherPaid === 0) {
      await this.prisma.user.update({
        where: { id: payment.userId },
        data: { paymentStatus: 'REFUNDED' },
      });
    }

    return payment;
  }
}
