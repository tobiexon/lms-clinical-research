import { Controller, Post, Get, Body, Param, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * POST /api/v1/payments
   * Guest checkout — no auth required.
   * If the user is already logged in their userId is extracted from the JWT;
   * if not, userId is null and the service auto-creates an account.
   */
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  processPayment(@Request() req: any, @Body() dto: CreatePaymentDto) {
    const userId = req.user?.id || null;
    return this.paymentsService.processPayment(userId, dto);
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
