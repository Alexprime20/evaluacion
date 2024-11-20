import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
