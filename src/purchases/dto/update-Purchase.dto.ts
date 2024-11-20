import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { PurchaseStatus } from '../../common/enums/purchase-status.enum';

export class UpdatePurchaseDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(PurchaseStatus)
  status?: PurchaseStatus;

  @IsOptional()
  paymentMethodId?: number;
}
