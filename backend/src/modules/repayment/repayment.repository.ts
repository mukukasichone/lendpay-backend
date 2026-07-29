import prisma from "../../config/prisma";
import { Prisma, Repayment } from "@prisma/client";

class RepaymentRepository {
  async create(data: Prisma.RepaymentCreateInput): Promise<Repayment> {
    return prisma.repayment.create({
      data,
    });
  }

  async findAll(): Promise<Repayment[]> {
    return prisma.repayment.findMany({
      include: {
        loan: true,
      },
      orderBy: {
        paymentDate: "desc",
      },
    });
  }

  async findById(id: string): Promise<Repayment | null> {
    return prisma.repayment.findUnique({
      where: { id },
      include: {
        loan: true,
      },
    });
  }

  async findByReceiptNumber(
    receiptNumber: string
  ): Promise<Repayment | null> {
    return prisma.repayment.findUnique({
      where: { receiptNumber },
      include: {
        loan: true,
      },
    });
  }

  async findByLoan(loanId: string): Promise<Repayment[]> {
    return prisma.repayment.findMany({
      where: {
        loanId,
      },
      include: {
        loan: true,
      },
      orderBy: {
        paymentDate: "desc",
      },
    });
  }
}

export default new RepaymentRepository();