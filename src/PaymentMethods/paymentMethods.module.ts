import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from '../PaymentMethods/entities/paymentMethod.entity';
import { PaymentMethodService } from '../PaymentMethods/paymentMethods.service';
import { PaymentMethodController } from '../PaymentMethods/paymentMethods.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
