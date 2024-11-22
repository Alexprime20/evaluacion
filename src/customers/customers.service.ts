import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateCustomerDto } from './dto/create-customers.dto';
import { UpdateCustomerDto } from './dto/update-customers.dto';
import { CustomerEntity } from './entities/customers.entity';
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { ManagerError } from '../common/errors/manager.error';
import { ResponseAllCustomers } from './interfaces/response-customers.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.save(createCustomerDto);
      if (!customer) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Cliente no registrado!',
        });
      }
      return customer;
    } catch (error) {
      throw new ManagerError(error.message); 
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllCustomers> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;
    try {
        
        const [total, data] = await Promise.all([
            this.customerRepository.count({ where: { isActive: true } }),
            this.customerRepository.find({where: {isActive: true}, take: limit, skip: skip}),
        ]);

        const lastPage = Math.ceil(total / limit);

        return {
            page,
            limit,
            lastPage,
            total,
            data,
        };
    } catch (error) {
        ManagerError.createSignatureError(error.message);
    }
}

  async findOne(id: string): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.createQueryBuilder('customer')
        .where('customer.id = :id', { id })
        .andWhere('customer.isActive = :isActive', { isActive: true })
        .getOne();

      if (!customer) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Cliente no encontrado!',
        });
      }

      return customer;
    } catch (error) {
      throw new ManagerError(error.message);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<UpdateResult> {
    try {
      const result = await this.customerRepository.update(
        { id, isActive: true },
        updateCustomerDto,
      );

      if (result.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: `Cliente no encontrado con ID: ${id}`,
        });
      }

      return result;
    } catch (error) {
      throw new ManagerError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const result = await this.customerRepository.update(
        { id, isActive: true },
        { isActive: false },
      );

      if (result.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Cliente no encontrado!',
        });
      }

      return result;
    } catch (error) {
      throw new ManagerError(error.message);
    }
  }
}
