import { CustomerEntity } from "../entities/customers.entity";

export interface ResponseAllCustomers {
    page: number,
    limit: number,
    lastPage: number,
    total: number,
    data: CustomerEntity[],
  }
  