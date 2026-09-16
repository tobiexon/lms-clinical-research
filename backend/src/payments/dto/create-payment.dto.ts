import { IsString, IsEmail, IsNumber, IsArray, IsOptional, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentItemDto {
  @IsString()
  courseId: string;

  @IsString()
  courseTitle: string;

  @IsString()
  courseSlug: string;

  @IsOptional()
  @IsString()
  courseCategory?: string;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreatePaymentDto {
  // Learner details
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  // Cart items
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentItemDto)
  items: PaymentItemDto[];

  // Payment method details (for real gateway — Stripe etc.)
  @IsOptional()
  @IsString()
  gatewayReference?: string;  // Stripe paymentIntent.id etc.

  @IsOptional()
  @IsString()
  cardLast4?: string;

  @IsOptional()
  @IsString()
  cardBrand?: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}
