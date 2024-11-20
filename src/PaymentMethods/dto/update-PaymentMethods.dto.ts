import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  paymentMethod?: string;
}