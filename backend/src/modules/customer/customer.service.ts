import { Customer, Prisma } from "@prisma/client";
import {
  ConflictError,
  NotFoundError,
} from "../../common/errors";
import customerRepository from "./customer.repository";

class CustomerService {
  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const existingCustomerNo =
      await customerRepository.findCustomerByCustomerNo(data.customerNo);

    if (existingCustomerNo) {
      throw new ConflictError(
        `Customer with customer number "${data.customerNo}" already exists.`
      );
    }

    const existingMobileNumber =
      await customerRepository.findCustomerByMobileNumber(data.mobileNumber);

    if (existingMobileNumber) {
      throw new ConflictError(
        `Customer with mobile number "${data.mobileNumber}" already exists.`
      );
    }

    return customerRepository.createCustomer(data);
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    return customerRepository.findCustomerById(id);
  }

  async findCustomerByCustomerNo(
    customerNo: string
  ): Promise<Customer | null> {
    return customerRepository.findCustomerByCustomerNo(customerNo);
  }

  async findCustomerByMobileNumber(
    mobileNumber: string
  ): Promise<Customer | null> {
    return customerRepository.findCustomerByMobileNumber(mobileNumber);
  }

  async getAllCustomers(): Promise<Customer[]> {
    return customerRepository.findAllCustomers();
  }

  async updateCustomer(
    id: string,
    data: Prisma.CustomerUpdateInput
  ): Promise<Customer> {
    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
      throw new NotFoundError("Customer not found.");
    }

    return customerRepository.updateCustomer(id, data);
  }

  async deactivateCustomer(id: string): Promise<Customer> {
    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
      throw new NotFoundError("Customer not found.");
    }

    return customerRepository.deactivateCustomer(id);
  }

  async activateCustomer(id: string): Promise<Customer> {
    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
      throw new NotFoundError("Customer not found.");
    }

    return customerRepository.activateCustomer(id);
  }
}

export default new CustomerService();