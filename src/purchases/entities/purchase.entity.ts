import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PaymentMethod } from '../../PaymentMethods/entities/paymentMethod.entity';
import { CustomerEntity } from '../../customers/entities/customers.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.purchases)
  paymentMethod: PaymentMethod;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
  customer: CustomerEntity;

  @Column({ type: 'enum', enum: ['CREATED', 'APPROVED', 'REJECTED'], default: 'CREATED' })
  status: string;
}
