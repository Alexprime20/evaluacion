import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { PaymentMethodService } from '../PaymentMethods/paymentMethods.service';
import { CreatePaymentMethodDto } from '../PaymentMethods/dto/create-paymentMethods.dto';
import { UpdatePaymentMethodDto } from '../PaymentMethods/dto/update-paymentMethods.dto';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async createPaymentMethod(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.createPaymentMethod(createPaymentMethodDto);
  }

  @Patch(':id')
  async updatePaymentMethod(
    @Param('id') id: number,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.updatePaymentMethod(id, updatePaymentMethodDto);
  }
}
