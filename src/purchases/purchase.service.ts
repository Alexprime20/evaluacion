import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ManagerError } from 'src/common/errors/manager.error';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    try {
      const purchase = await this.purchaseRepository.save(createPurchaseDto);
      if( !purchase ){
        throw new ManagerError({
          type: `CONFLICT`,
          message: `Purchase not created!`,
        })
      }
      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }

  async updatePurchase(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<UpdateResult> {
    try {
      const purchase:UpdateResult = await this.purchaseRepository.update(id, updatePurchaseDto);
      if( purchase.affected===0 ){
        throw new ManagerError({
          type: `NOT_FOUND`,
          message: `Purchase not found!`,
        })
      }
      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }

  async findOne(id: number): Promise<Purchase> {
    try {
      const purchase = await this.purchaseRepository.findOne({where: {id}});
      if( !purchase ){
        throw new ManagerError({
          type: `NOT_FOUND`,
          message: `Purchase not found!`,
        })
      }
      return purchase;
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }
}
