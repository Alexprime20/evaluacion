import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentMethod: string;

  @OneToMany(() => Purchase, (purchase) => purchase.paymentMethod)
  purchases: Purchase[];
}
