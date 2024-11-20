import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchase(createPurchaseDto);
  }

  @Patch(':id')
  async updatePurchase(
    @Param('id') id: number,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.updatePurchase(id, updatePurchaseDto);
  }
}
