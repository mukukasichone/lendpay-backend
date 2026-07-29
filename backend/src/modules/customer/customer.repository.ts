import { Customer, Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

class CustomerRepository {
  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return prisma.customer.create({
      data,
    });
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: { id },
    });
  }

  async findCustomerByCustomerNo(
    customerNo: string
  ): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: { customerNo },
    });
  }

  async findCustomerByMobileNumber(
    mobileNumber: string
  ): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: { mobileNumber },
    });
  }

  async findAllCustomers(): Promise<Customer[]> {
    return prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateCustomer(
    id: string,
    data: Prisma.CustomerUpdateInput
  ): Promise<Customer> {
    return prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deactivateCustomer(id: string): Promise<Customer> {
    return prisma.customer.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async activateCustomer(id: string): Promise<Customer> {
    return prisma.customer.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }
}

export default new CustomerRepository();