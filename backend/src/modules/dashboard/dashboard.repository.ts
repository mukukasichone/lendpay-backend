import { LoanStatus, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DashboardRepository {
  async getSummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      customers,
      activeLoans,
      overdueLoans,
      loanTotals,
      repaymentsToday,
    ] = await Promise.all([
      prisma.customer.count(),

      prisma.loan.count({
        where: {
          status: LoanStatus.ACTIVE,
        },
      }),

      prisma.loan.count({
        where: {
          status: LoanStatus.OVERDUE,
        },
      }),

      prisma.loan.aggregate({
        _sum: {
          outstandingPrincipal: true,
          outstandingInterest: true,
          outstandingPenalty: true,
        },
      }),

      prisma.repayment.aggregate({
        where: {
          paymentDate: {
            gte: today,
          },
        },
        _sum: {
          amountPaid: true,
        },
      }),
    ]);

    return {
      customers,
      activeLoans,
      overdueLoans,
      totalPrincipal:
        loanTotals._sum.outstandingPrincipal ?? new Prisma.Decimal(0),

      totalInterest:
        loanTotals._sum.outstandingInterest ?? new Prisma.Decimal(0),

      totalPenalty:
        loanTotals._sum.outstandingPenalty ?? new Prisma.Decimal(0),

      todayRepayments:
        repaymentsToday._sum.amountPaid ?? new Prisma.Decimal(0),
    };
  }
}

export default new DashboardRepository();