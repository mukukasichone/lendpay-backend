import { Loan, Prisma } from "@prisma/client";
import prisma from "../../config/prisma";

class LoanRepository {
  async create(data: Prisma.LoanCreateInput): Promise<Loan> {
    return prisma.loan.create({
      data,
    });
  }

  async findAll(): Promise<Loan[]> {
    return prisma.loan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<Loan | null> {
    return prisma.loan.findUnique({
      where: { id },
    });
  }

  async findByLoanNumber(loanNumber: string): Promise<Loan | null> {
    return prisma.loan.findUnique({
      where: { loanNumber },
    });
  }

  async findByCustomer(customerId: string): Promise<Loan[]> {
    return prisma.loan.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, data: Prisma.LoanUpdateInput): Promise<Loan> {
    return prisma.loan.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string): Promise<Loan> {
    return prisma.loan.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async activate(id: string): Promise<Loan> {
    return prisma.loan.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }
}

export default new LoanRepository();