import prisma from "../../config/prisma";
import { Loan, LoanStatus } from "@prisma/client";

class OverdueRepository {
  async findActivePastMaturity(): Promise<Loan[]> {
    return prisma.loan.findMany({
      where: {
        status: LoanStatus.ACTIVE,
        maturityDate: {
          not: null,
          lt: new Date(),
        },
      },
    });
  }

  async markOverdue(id: string): Promise<Loan> {
    return prisma.loan.update({
      where: { id },
      data: {
        status: LoanStatus.OVERDUE,
      },
    });
  }
}

export default new OverdueRepository();