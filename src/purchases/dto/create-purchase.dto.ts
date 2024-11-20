import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { PurchaseStatus } from '../../common/enums/purchase-status.enum';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsEnum(PurchaseStatus)
  status: PurchaseStatus;

  @IsNotEmpty()
  paymentMethodId: number;
}
