import { Controller, Post, Get, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * POST /api/v1/payments
   * Called by checkout page after card is processed.
   * Creates payment record, enrols user in courses, marks user as PAID.
   * Protected — user must be logged in.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  processPayment(@Request() req: any, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.processPayment(req.user.id, dto);
  }

  /**
   * GET /api/v1/payments
   * Get current user's payment/purchase history.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  getMyPayments(@Request() req: any) {
    return this.paymentsService.getUserPayments(req.user.id);
  }

  /**
   * GET /api/v1/payments/:id
   * Get a specific payment (receipt).
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPayment(@Request() req: any, @Param('id') id: string) {
    return this.paymentsService.getPaymentById(id, req.user.id);
  }
}
