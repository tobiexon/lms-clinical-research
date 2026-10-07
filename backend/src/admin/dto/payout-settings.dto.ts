import {
  IsString, IsOptional, IsIn, IsInt, IsNumber,
  Min, MaxLength, IsIP,
} from 'class-validator';

export class UpdatePayoutSettingsDto {
  @IsOptional()
  @IsString()
  @MaxLength(4)
  stripeBankAccountLast4?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  stripeBankName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  stripeAccountId?: string;

  @IsOptional()
  @IsIn(['automatic', 'manual'])
  payoutSchedule?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  payoutIntervalDays?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumPayoutAmount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  beneficiaryName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
