import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Decimal } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private enrollments: EnrollmentsService,
    private notifications: NotificationsService,
  ) {}

  /**
   * Process a payment:
   * 1. Create Payment record (PENDING)
   * 2. Create PaymentItem records for each course
   * 3. Enrol user in each course
   * 4. Mark Payment as PAID
   * 5. Update User.paymentStatus to PAID
   */
  async processPayment(userId: string | null, dto: CreatePaymentDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('No items in payment');
    }

    // ── Handle guest checkout — auto-create account ───────
    let resolvedUserId = userId;
    let temporaryPassword: string | undefined;
    let isNewAccount = false;

    if (!resolvedUserId) {
      // Check if account already exists for this email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        resolvedUserId = existingUser.id;
      } else {
        // Auto-create account with random password
        temporaryPassword = this.generatePassword();
        const passwordHash = await bcrypt.hash(temporaryPassword, 12);

        const newUser = await this.prisma.user.create({
          data: {
            email: dto.email,
            passwordHash,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: 'LEARNER',
            country: 'GB',
            isEmailVerified: true,
            paymentStatus: 'PENDING' as any,
          },
        });
        resolvedUserId = newUser.id;
        isNewAccount = true;
        this.logger.log(`Auto-created account for guest: ${dto.email}`);
      }
    }

    // From here on, always use resolvedUserId

    // Calculate totals
    const subtotal = dto.items.reduce((sum, item) => sum + item.unitPrice, 0);
    const totalAmount = subtotal;

    this.logger.log(`Processing payment for user ${resolvedUserId} — ${dto.items.length} course(s) — £${totalAmount}`);

    // ── Step 1: Create Payment record as PENDING ──────────
    const payment = await this.prisma.payment.create({
      data: {
        userId: resolvedUserId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        status: 'PENDING',
        method: 'CARD',
        currency: 'GBP',
        subtotal: new Decimal(subtotal),
        discount: new Decimal(0),
        tax: new Decimal(0),
        totalAmount: new Decimal(totalAmount),
        gatewayReference: dto.gatewayReference || null,
        cardLast4: dto.cardLast4 || null,
        cardBrand: dto.cardBrand || null,
        ipAddress: dto.ipAddress || null,
        // Create all payment items
        items: {
          create: dto.items.map((item) => ({
            courseId: item.courseId,
            courseTitle: item.courseTitle,
            courseSlug: item.courseSlug,
            courseCategory: item.courseCategory || null,
            unitPrice: new Decimal(item.unitPrice),
            quantity: 1,
            lineTotal: new Decimal(item.unitPrice),
          })),
        },
      },
      include: { items: true },
    });

    // ── Step 2: Enrol user in each course ─────────────────
    const enrollmentResults: { courseId: string; enrollmentId: string | null; error?: string }[] = [];

    for (const item of dto.items) {
      try {
        const enrollment = await this.enrollments.enroll(resolvedUserId, item.courseId);

        // Link enrollment to payment item
        await this.prisma.paymentItem.update({
          where: { id: payment.items.find((pi) => pi.courseId === item.courseId)?.id },
          data: { enrollmentId: enrollment.id },
        });

        enrollmentResults.push({ courseId: item.courseId, enrollmentId: enrollment.id });
      } catch (err: any) {
        // Already enrolled — not an error, just log
        const msg = err?.message || '';
        if (msg.toLowerCase().includes('already enrolled')) {
          this.logger.warn(`User ${resolvedUserId} already enrolled in course ${item.courseId} — skipping`);
          enrollmentResults.push({ courseId: item.courseId, enrollmentId: null });
        } else {
          this.logger.error(`Enrolment failed for course ${item.courseId}: ${msg}`);
          enrollmentResults.push({ courseId: item.courseId, enrollmentId: null, error: msg });
        }
      }
    }

    // ── Step 3: Mark payment as PAID ──────────────────────
    const paidPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
      include: {
        items: true,
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, paymentStatus: true },
        },
      },
    });

    // ── Step 4: Update user paymentStatus → PAID ──────────
    await this.prisma.user.update({
      where: { id: resolvedUserId },
      data: { paymentStatus: 'PAID' as any },
    });

    this.logger.log(`Payment ${payment.id} confirmed for user ${resolvedUserId} — status: PAID`);

    // ── Step 5: Send payment confirmation email ────────────
    const user = await this.prisma.user.findUnique({
      where: { id: resolvedUserId },
      select: { email: true, firstName: true, lastName: true },
    });

    if (user) {
      // Generate magic login token so email button auto-logs them in
      let magicLoginUrl: string | undefined;
      try {
        const magicToken = await this.generateMagicToken(resolvedUserId);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        magicLoginUrl = `${frontendUrl}/auth/magic/${magicToken}`;
      } catch {
        // Magic token generation failed — fall back to regular dashboard link
        this.logger.warn('Magic token generation failed — using plain dashboard link');
      }

      // For NEW accounts: send ONE combined email (welcome + credentials + payment receipt)
      // For EXISTING accounts: send just the payment confirmation
      if (isNewAccount && temporaryPassword) {
        // Single combined email — account creation + payment receipt + magic link
        this.notifications.sendNewAccountWithPaymentEmail({
          email: user.email,
          firstName: user.firstName,
          temporaryPassword,
          magicLoginUrl,
          paymentId: paidPayment.id,
          totalAmount: parseFloat(paidPayment.totalAmount.toString()),
          currency: paidPayment.currency,
          paidAt: paidPayment.paidAt!,
          items: paidPayment.items.map((item) => ({
            courseTitle: item.courseTitle,
            unitPrice: parseFloat(item.unitPrice.toString()),
          })),
        }).catch(() => {});
      } else {
        // Existing user — just payment confirmation
        this.notifications.sendPaymentConfirmationEmail({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          paymentId: paidPayment.id,
          totalAmount: parseFloat(paidPayment.totalAmount.toString()),
          currency: paidPayment.currency,
          paidAt: paidPayment.paidAt!,
          magicLoginUrl,
          items: paidPayment.items.map((item) => ({
            courseTitle: item.courseTitle,
            unitPrice: parseFloat(item.unitPrice.toString()),
          })),
        }).catch(() => {});
      }
    }

    return {
      paymentId: paidPayment.id,
      status: paidPayment.status,
      totalAmount: paidPayment.totalAmount,
      paidAt: paidPayment.paidAt,
      coursesEnrolled: enrollmentResults.filter((r) => !r.error).length,
      items: paidPayment.items,
      user: paidPayment.user,
    };
  }

  /**
   * Get all payments for a user (their purchase history)
   */
  async getUserPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });
  }

  /**
   * Get a single payment by ID
   */
  async getPaymentById(paymentId: string, userId: string) {
    return this.prisma.payment.findFirst({
      where: { id: paymentId, userId },
      include: { items: true },
    });
  }

  /**
   * Admin: get all payments with user info
   */
  async getAllPayments(page = 1, limit = 30) {
    const skip = (page - 1) * limit;
    const [payments, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, country: true },
          },
          items: true,
        },
      }),
      this.prisma.payment.count(),
    ]);
    return { payments, total };
  }

  /**
   * Admin: payment revenue stats
   */
  async getPaymentStats() {
    const [totalRevenue, totalPayments, paidCount, pendingCount, refundedCount] =
      await this.prisma.$transaction([
        this.prisma.payment.aggregate({
          where: { status: 'PAID' },
          _sum: { totalAmount: true },
        }),
        this.prisma.payment.count(),
        this.prisma.payment.count({ where: { status: 'PAID' } }),
        this.prisma.payment.count({ where: { status: 'PENDING' } }),
        this.prisma.payment.count({ where: { status: 'REFUNDED' } }),
      ]);

    return {
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalPayments,
      paidCount,
      pendingCount,
      refundedCount,
    };
  }

  /**
   * Generate a one-time magic login token for a user.
   * Stored in magic_tokens table — 48hr expiry, single use.
   */
  private async generateMagicToken(userId: string): Promise<string> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);
    const magic = await this.prisma.magicToken.create({
      data: { userId, expiresAt },
    });
    return magic.token;
  }

  private generatePassword(): string {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    return Array.from({ length: 8 }, () =>
      chars[Math.floor(Math.random() * chars.length)],
    ).join('');
  }
}
