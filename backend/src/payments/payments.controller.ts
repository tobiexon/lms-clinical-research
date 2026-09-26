import { Controller, Post, Get, Body, Param, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, CreatePaymentIntentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * POST /api/v1/payments/create-intent
   * Step 1: Create a Stripe PaymentIntent. Returns clientSecret to the
   * frontend so Stripe Elements can collect card details securely.
   * No auth required — works for guest checkout too.
   */
  @UseGuards(OptionalJwtAuthGuard)
  @Post('create-intent')
  createPaymentIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.paymentsService.createPaymentIntent(dto);
  }

  /**
   * POST /api/v1/payments
   * Step 2: Called after Stripe confirms the payment on the frontend.
   * Receives the gatewayReference (PaymentIntent ID) so the backend can
   * verify it with Stripe, then creates enrolments.
   * Guest checkout — no auth required.
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
