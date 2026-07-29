import prisma from "../../config/prisma";
import auditLogservice from "../auditLog/auditLog.service";
import {
  LoanStatus,
  LoanApplicationStatus,
  TransactionType,
  Prisma,
} from "@prisma/client";

import { randomUUID } from "crypto";

import { NotFoundError } from "../../common/errors";

import loanApplicationRepository from "../loanApplication/loanApplication.repository";
import userRepository from "../user/user.repository";

import {
  CreateDisbursementDto,
} from "./disbursement.validation";

class DisbursementService {
  async create(data: CreateDisbursementDto) {
    const application =
      await loanApplicationRepository.findById(
        data.applicationId
      );

    if (!application) {
      throw new NotFoundError("Application not found.");
    }

    if (application.status !== "APPROVED") {
      throw new Error(
        "Only approved applications can be disbursed."
      );
    }

    const user = await userRepository.findById(
      data.disbursedById
    );

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const referenceNumber =
      "DIS-" + Date.now();

    const loanNumber =
      "LN-" +
      Date.now() +
      "-" +
      randomUUID().substring(0, 6).toUpperCase();

    // Create one timestamp and reuse it everywhere
    const disbursedAt = new Date();

    // Calculate loan maturity date
    const maturityDate = new Date(disbursedAt);
    maturityDate.setDate(
      maturityDate.getDate() +
        application.requestedTermDays
    );

    return prisma.$transaction(async (tx) => {
      const disbursement =
        await tx.disbursement.create({
          data: {
            application: {
              connect: {
                id: data.applicationId,
              },
            },

            disbursedBy: {
              connect: {
                id: data.disbursedById,
              },
            },

            amount: new Prisma.Decimal(data.amount),

            referenceNumber,

            bankName: data.bankName,

            bankAccountNumber:
              data.bankAccountNumber,

            mobileMoneyNumber:
              data.mobileMoneyNumber,

            transactionReference:
              data.transactionReference,

            remarks: data.remarks,
          },
        });

      const product =
        application.loanProduct;

      const principal =
        Number(data.amount);

      const interestRate =
        Number(product.interestRate);

      const totalInterest =
        (principal * interestRate) / 100;

      const totalRepayable =
        principal + totalInterest;

      const loan =
        await tx.loan.create({
          data: {
            loanNumber,

            application: {
              connect: {
                id: application.id,
              },
            },

            customer: {
              connect: {
                id: application.customerId,
              },
            },

            loanProduct: {
              connect: {
                id: application.loanProductId,
              },
            },

            principalAmount:
              new Prisma.Decimal(principal),

            interestRate:
              new Prisma.Decimal(interestRate),

            interestCalculationMethod:
              product.interestCalculationMethod,

            processingFee:
              product.processingFee,

            penaltyRate:
              product.penaltyRate,

            termDays:
              application.requestedTermDays,

            totalInterest:
              new Prisma.Decimal(totalInterest),

            totalRepayable:
              new Prisma.Decimal(totalRepayable),

            outstandingPrincipal:
              new Prisma.Decimal(principal),

            outstandingInterest:
              new Prisma.Decimal(totalInterest),

            approvedAt:
              application.approvedAt,

            disbursedAt,

            maturityDate,

            status:
              LoanStatus.ACTIVE,
          },
        });

      await tx.loanTransaction.create({
        data: {
          loan: {
            connect: {
              id: loan.id,
            },
          },

          createdBy: {
            connect: {
              id: data.disbursedById,
            },
          },

          transactionType:
            TransactionType.DISBURSEMENT,

          amount:
            new Prisma.Decimal(principal),

          principalComponent:
            new Prisma.Decimal(principal),

          interestComponent:
            new Prisma.Decimal(0),

          penaltyComponent:
            new Prisma.Decimal(0),

          balanceAfter:
            new Prisma.Decimal(totalRepayable),

          reference:
            referenceNumber,

          narration:
            "Loan disbursed",
        },
      });

      await tx.loanApplication.update({
        where: {
          id: application.id,
        },
        data: {
          status:
            LoanApplicationStatus.DISBURSED,

          disbursedAt,
        },
      });

      return disbursement;
    });
  }

  async findAll() {
    return prisma.disbursement.findMany({
      include: {
        application: true,
        disbursedBy: true,
      },
    });
  }

  async findById(id: string) {
    const disbursement =
      await prisma.disbursement.findUnique({
        where: {
          id,
        },
        include: {
          application: true,
          disbursedBy: true,
        },
      });

    if (!disbursement) {
      throw new NotFoundError(
        "Disbursement not found."
      );
    }

    return disbursement;
  }
}

export default new DisbursementService();