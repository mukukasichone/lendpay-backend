import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PenaltyRepository {
  async getOverdueLoans() {
    return prisma.loan.findMany({
      where: {
        status: "OVERDUE",
        isActive: true,
      },
      orderBy: {
        maturityDate: "asc",
      },
    });
  }

  async hasPenaltyAppliedToday(
    tx: Prisma.TransactionClient,
    loanId: string,
    today: Date
  ) {
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    const penalty = await tx.loanPenalty.findFirst({
      where: {
        loanId,
        appliedDate: {
          gte: start,
          lte: end,
        },
      },
    });

    return !!penalty;
  }

  async createPenaltyRecord(
    tx: Prisma.TransactionClient,
    data: {
      loanId: string;
      amount: Prisma.Decimal;
      penaltyRate: Prisma.Decimal;
      appliedDate: Date;
    }
  ) {
    return tx.loanPenalty.create({
      data,
    });
  }

  async updateLoanPenalty(
    tx: Prisma.TransactionClient,
    loanId: string,
    amount: Prisma.Decimal
  ) {
    return tx.loan.update({
      where: { id: loanId },
      data: {
        outstandingPenalty: {
          increment: amount,
        },
      },
    });
  }

  async createLoanTransaction(
    tx: Prisma.TransactionClient,
    data: {
      loanId: string;
      amount: Prisma.Decimal;
      balanceAfter: Prisma.Decimal;
      reference: string;
      narration: string;
      createdById?: string;
    }
  ) {
    return tx.loanTransaction.create({
      data: {
        loanId: data.loanId,
        transactionType: "PENALTY",
        amount: data.amount,
        principalComponent: new Prisma.Decimal(0),
        interestComponent: new Prisma.Decimal(0),
        penaltyComponent: data.amount,
        balanceAfter: data.balanceAfter,
        reference: data.reference,
        narration: data.narration,
        createdById: data.createdById,
      },
    });
  }
}

export default new PenaltyRepository();