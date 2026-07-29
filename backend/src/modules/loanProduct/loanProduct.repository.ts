import { LoanProduct, Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

class LoanProductRepository {
  async create(
    data: Prisma.LoanProductCreateInput
  ): Promise<LoanProduct> {
    return prisma.loanProduct.create({
      data,
    });
  }

  async findAll(): Promise<LoanProduct[]> {
    return prisma.loanProduct.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<LoanProduct | null> {
    return prisma.loanProduct.findUnique({
      where: { id },
    });
  }

  async findByCode(productCode: string): Promise<LoanProduct | null> {
    return prisma.loanProduct.findUnique({
      where: { productCode },
    });
  }

  async findByName(productName: string): Promise<LoanProduct | null> {
    return prisma.loanProduct.findUnique({
      where: { productName },
    });
  }

  async update(
    id: string,
    data: Prisma.LoanProductUpdateInput
  ): Promise<LoanProduct> {
    return prisma.loanProduct.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string): Promise<LoanProduct> {
    return prisma.loanProduct.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async activate(id: string): Promise<LoanProduct> {
    return prisma.loanProduct.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }
}

export default new LoanProductRepository();