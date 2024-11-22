import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';
import { BaseEntity } from 'src/common/config/base.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @Column({ name: 'customer_name', type: 'varchar', length: 255 })
  customerName: string;

  @Column({ name: 'customer_contact', type: 'varchar', length: 255 })
  customerContact: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'postal_code', type: 'int' })
  postalCode: number;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'boolean', default: true }) // Propiedad para controlar si el cliente está activo
  isActive: boolean;

  @OneToMany(() => Purchase, (purchase) => purchase.customer)
  purchases: Purchase[];
}
