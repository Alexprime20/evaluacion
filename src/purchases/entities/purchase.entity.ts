import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, EntitySchemaEmbeddedColumnOptions } from 'typeorm';
import { PaymentMethod } from '../../PaymentMethods/entities/paymentMethod.entity';
import { PurchaseStatus } from '../../common/enums/purchase-status.enum'; 


@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PurchaseStatus,
    default: PurchaseStatus.CREATED,
  })
  status: PurchaseStatus;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.purchases)
  paymentMethod: PaymentMethod;
}
