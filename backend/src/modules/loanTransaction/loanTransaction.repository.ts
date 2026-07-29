import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

import { userSelect } from "../../common/selects/user.select";

class LoanTransactionRepository {
  async create(data: Prisma.LoanTransactionCreateInput) {
    return prisma.loanTransaction.create({
      data,
      include: {
        loan: true,
        createdBy: {
          select: userSelect,
        },
      },
    });
  }

  async findAll() {
    return prisma.loanTransaction.findMany({
      include: {
        loan: true,
        createdBy: {
          select: userSelect,
        },
      },
      orderBy: {
        transactionDate: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.loanTransaction.findUnique({
      where: {
        id,
      },
      include: {
        loan: true,
        createdBy: {
          select: userSelect,
        },
      },
    });
  }

  async findByLoan(loanId: string) {
    return prisma.loanTransaction.findMany({
      where: {
        loanId,
      },
      include: {
        createdBy: {
          select: userSelect,
        },
      },
      orderBy: {
        transactionDate: "asc",
      },
    });
  }
}

export default new LoanTransactionRepository();