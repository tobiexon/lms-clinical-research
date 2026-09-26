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

  // Stripe payment method — set after Stripe confirms payment on the frontend
  @IsOptional()
  @IsString()
  gatewayReference?: string;  // Stripe paymentIntent.id

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

/** DTO for creating a Stripe PaymentIntent (step 1 of checkout) */
export class CreatePaymentIntentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentItemDto)
  items: PaymentItemDto[];

  @IsEmail()
  email: string;
}
