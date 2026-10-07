import {
  Controller, Get, Put, Body, Req, UseGuards,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SuperAdminGuard } from '../guards/super-admin.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePayoutSettingsDto } from '../dto/payout-settings.dto';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Payout Settings — SUPER_ADMIN only.
 *
 * These endpoints control how Stripe routes funds to the CRN bank account.
 * Every change is written to an immutable audit log.
 *
 * Stripe actually handles the money movement — the settings stored here
 * are descriptive/reference fields that mirror what is configured in the
 * Stripe Dashboard (Dashboard → Settings → Payouts).
 * Admins update Stripe directly; these fields keep a human-readable record
 * inside the LMS for transparency and auditing.
 */
@UseGuards(JwtAuthGuard, SuperAdminGuard)
@Controller('admin/payout-settings')
export class AdminPayoutSettingsController {
  constructor(private readonly prisma: PrismaService) {}

  /** GET /api/v1/admin/payout-settings */
  @Get()
  async getSettings() {
    // Return singleton row (or empty defaults if not yet configured)
    const settings = await this.prisma.payoutSettings.findFirst();
    return settings ?? {
      id: null,
      stripeBankAccountLast4: null,
      stripeBankName: null,
      stripeAccountId: null,
      payoutSchedule: 'automatic',
      payoutIntervalDays: 7,
      minimumPayoutAmount: 0,
      currency: 'GBP',
      beneficiaryName: null,
      notes: null,
      updatedAt: null,
      updatedByAdminEmail: null,
    };
  }

  /** GET /api/v1/admin/payout-settings/audit-log */
  @Get('audit-log')
  async getAuditLog() {
    return this.prisma.payoutSettingsAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  /** PUT /api/v1/admin/payout-settings */
  @Put()
  @HttpCode(HttpStatus.OK)
  async updateSettings(
    @Body() dto: UpdatePayoutSettingsDto,
    @Req() req: any,
  ) {
    const admin = req.user;           // populated by JwtAuthGuard
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';

    // Load existing to diff for audit log
    const existing = await this.prisma.payoutSettings.findFirst();

    // Upsert the single settings row
    const updated = await this.prisma.payoutSettings.upsert({
      where: { id: existing?.id ?? 'singleton' },
      create: {
        id: 'singleton',
        ...(dto.stripeBankAccountLast4 !== undefined && { stripeBankAccountLast4: dto.stripeBankAccountLast4 }),
        ...(dto.stripeBankName         !== undefined && { stripeBankName:         dto.stripeBankName }),
        ...(dto.stripeAccountId        !== undefined && { stripeAccountId:        dto.stripeAccountId }),
        ...(dto.payoutSchedule         !== undefined && { payoutSchedule:         dto.payoutSchedule }),
        ...(dto.payoutIntervalDays     !== undefined && { payoutIntervalDays:     dto.payoutIntervalDays }),
        ...(dto.minimumPayoutAmount    !== undefined && { minimumPayoutAmount:    new Decimal(dto.minimumPayoutAmount) }),
        ...(dto.currency               !== undefined && { currency:               dto.currency }),
        ...(dto.beneficiaryName        !== undefined && { beneficiaryName:        dto.beneficiaryName }),
        ...(dto.notes                  !== undefined && { notes:                  dto.notes }),
        updatedByAdminId:    admin.sub,
        updatedByAdminEmail: admin.email,
      },
      update: {
        ...(dto.stripeBankAccountLast4 !== undefined && { stripeBankAccountLast4: dto.stripeBankAccountLast4 }),
        ...(dto.stripeBankName         !== undefined && { stripeBankName:         dto.stripeBankName }),
        ...(dto.stripeAccountId        !== undefined && { stripeAccountId:        dto.stripeAccountId }),
        ...(dto.payoutSchedule         !== undefined && { payoutSchedule:         dto.payoutSchedule }),
        ...(dto.payoutIntervalDays     !== undefined && { payoutIntervalDays:     dto.payoutIntervalDays }),
        ...(dto.minimumPayoutAmount    !== undefined && { minimumPayoutAmount:    new Decimal(dto.minimumPayoutAmount) }),
        ...(dto.currency               !== undefined && { currency:               dto.currency }),
        ...(dto.beneficiaryName        !== undefined && { beneficiaryName:        dto.beneficiaryName }),
        ...(dto.notes                  !== undefined && { notes:                  dto.notes }),
        updatedByAdminId:    admin.sub,
        updatedByAdminEmail: admin.email,
      },
    });

    // Write one audit entry per changed field
    const fields = Object.keys(dto) as (keyof UpdatePayoutSettingsDto)[];
    for (const field of fields) {
      const oldVal = existing ? String((existing as any)[field] ?? '') : '';
      const newVal = String(dto[field] ?? '');
      if (oldVal !== newVal) {
        await this.prisma.payoutSettingsAuditLog.create({
          data: {
            adminId:     admin.sub,
            adminEmail:  admin.email,
            action:      'UPDATE_PAYOUT_SETTINGS',
            fieldChanged: field,
            oldValue:    oldVal || null,
            newValue:    newVal || null,
            ipAddress:   ip,
          },
        });
      }
    }

    return updated;
  }
}
