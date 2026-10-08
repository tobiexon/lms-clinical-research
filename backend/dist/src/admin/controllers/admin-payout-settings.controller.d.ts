import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePayoutSettingsDto } from '../dto/payout-settings.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class AdminPayoutSettingsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        currency: string;
        notes: string | null;
        stripeBankAccountLast4: string | null;
        stripeBankName: string | null;
        stripeAccountId: string | null;
        payoutSchedule: string;
        payoutIntervalDays: number;
        minimumPayoutAmount: Decimal;
        beneficiaryName: string | null;
        updatedByAdminId: string | null;
        updatedByAdminEmail: string | null;
    } | {
        id: any;
        stripeBankAccountLast4: any;
        stripeBankName: any;
        stripeAccountId: any;
        payoutSchedule: string;
        payoutIntervalDays: number;
        minimumPayoutAmount: number;
        currency: string;
        beneficiaryName: any;
        notes: any;
        updatedAt: any;
        updatedByAdminEmail: any;
    }>;
    getAuditLog(): Promise<{
        id: string;
        createdAt: Date;
        ipAddress: string | null;
        adminId: string;
        adminEmail: string;
        action: string;
        fieldChanged: string;
        oldValue: string | null;
        newValue: string | null;
    }[]>;
    updateSettings(dto: UpdatePayoutSettingsDto, req: any): Promise<{
        id: string;
        updatedAt: Date;
        currency: string;
        notes: string | null;
        stripeBankAccountLast4: string | null;
        stripeBankName: string | null;
        stripeAccountId: string | null;
        payoutSchedule: string;
        payoutIntervalDays: number;
        minimumPayoutAmount: Decimal;
        beneficiaryName: string | null;
        updatedByAdminId: string | null;
        updatedByAdminEmail: string | null;
    }>;
}
