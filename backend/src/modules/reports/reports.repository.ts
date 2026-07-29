import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ReportsRepository {
  async getReports() {
    const [loans, disbursements, repayments, writeOffs] =
      await Promise.all([
        prisma.loan.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            customer: {
              select: {
                customerNo: true,
                firstName: true,
                lastName: true,
              },
            },
            loanProduct: {
              select: {
                productCode: true,
                productName: true,
              },
            },
          },
        }),

        prisma.disbursement.findMany({
          orderBy: { disbursedAt: "desc" },
          include: {
            application: {
              select: {
                applicationNumber: true,
                customer: {
                  select: {
                    customerNo: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
            disbursedBy: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        }),

        prisma.repayment.findMany({
          orderBy: { paymentDate: "desc" },
          include: {
            loan: {
              select: {
                loanNumber: true,
                customer: {
                  select: {
                    customerNo: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        }),

        prisma.writeOff.findMany({
          orderBy: { writtenOffAt: "desc" },
          include: {
            loan: {
              select: {
                loanNumber: true,
                customer: {
                  select: {
                    customerNo: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
            approvedBy: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        }),
      ]);

    return {
      loans: loans.map((loan) => ({
        loanNumber: loan.loanNumber,
        customerNo: loan.customer.customerNo,
        customerName: `${loan.customer.firstName} ${loan.customer.lastName}`,
        productCode: loan.loanProduct.productCode,
        productName: loan.loanProduct.productName,
        principalAmount: loan.principalAmount,
        totalInterest: loan.totalInterest,
        outstandingPrincipal: loan.outstandingPrincipal,
        outstandingInterest: loan.outstandingInterest,
        outstandingPenalty: loan.outstandingPenalty,
        outstandingBalance:
          loan.outstandingPrincipal
            .add(loan.outstandingInterest)
            .add(loan.outstandingPenalty),
        status: loan.status,
        disbursedAt: loan.disbursedAt,
        maturityDate: loan.maturityDate,
      })),

      disbursements: disbursements.map((d) => ({
        referenceNumber: d.referenceNumber,
        applicationNumber: d.application.applicationNumber,
        customerNo: d.application.customer.customerNo,
        customerName: `${d.application.customer.firstName} ${d.application.customer.lastName}`,
        amount: d.amount,
        bankName: d.bankName,
        transactionReference: d.transactionReference,
        disbursedBy: `${d.disbursedBy.firstName} ${d.disbursedBy.lastName}`,
        disbursedAt: d.disbursedAt,
      })),

      repayments: repayments.map((r) => ({
        receiptNumber: r.receiptNumber,
        loanNumber: r.loan.loanNumber,
        customerNo: r.loan.customer.customerNo,
        customerName: `${r.loan.customer.firstName} ${r.loan.customer.lastName}`,
        amountPaid: r.amountPaid,
        principalPaid: r.principalPaid,
        interestPaid: r.interestPaid,
        penaltyPaid: r.penaltyPaid,
        paymentMethod: r.paymentMethod,
        paymentDate: r.paymentDate,
      })),

      writeOffs: writeOffs.map((w) => ({
        loanNumber: w.loan.loanNumber,
        customerNo: w.loan.customer.customerNo,
        customerName: `${w.loan.customer.firstName} ${w.loan.customer.lastName}`,
        amount: w.amount,
        reason: w.reason,
        approvedBy: `${w.approvedBy.firstName} ${w.approvedBy.lastName}`,
        writtenOffAt: w.writtenOffAt,
      })),
    };
  }
}

export default new ReportsRepository();