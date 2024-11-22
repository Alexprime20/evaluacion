import { PurchaseStatus } from '../../common/enums/purchase-status.enum';

export interface Purchase {
  id: number;
  customerId: number;
  paymentMethodId: number;
  status: PurchaseStatus;
}
