import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PaymentMethod } from '../PaymentMethods/entities/paymentMethod.entity';
import { CreatePaymentMethodDto } from '../PaymentMethods/dto/create-paymentMethods.dto';
import { UpdatePaymentMethodDto } from '../PaymentMethods/dto/update-paymentMethods.dto';
import { ManagerError } from 'src/common/errors/manager.error';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async createPurchase(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    try {
      const paymentMethod = await this.paymentMethodRepository.save(createPaymentMethodDto);
      if( !paymentMethod ){
        throw new ManagerError({
          type: `CONFLICT`,
          message: `Payment Method not added!`,
        })
      }
      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }

  async updatePaymentMethod(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<UpdateResult> {
    try {
      const purchase:UpdateResult = await this.paymentMethodRepository.update(id, updatePaymentMethodDto);
      if( purchase.affected===0 ){
        throw new ManagerError({
          type: `NOT_FOUND`,
          message: `Payment Method not found!`,
        })
      }
      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }

  async findOne(id: number): Promise<PaymentMethod> {
    try {
      const paymentMethod = await this.paymentMethodRepository.findOne({where: {id}});
      if( !paymentMethod ){
        throw new ManagerError({
          type: `NOT_FOUND`,
          message: `Payment Method not found!`,
        })
      }
      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }
}
