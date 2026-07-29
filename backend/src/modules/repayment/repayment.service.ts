import prisma from "../../config/prisma";
import auditLogService from "../auditLog/auditLog.service";
import { allocateRepayment } from "../../utils/repayment-allocation.util";

import {
  AuditAction,
  AuditEntity,
} from "../../common/constants/audit.constants";

import {
  LoanStatus,
  Prisma,
  Repayment,
  RepaymentMethod,
  TransactionType,
} from "@prisma/client";

import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../common/errors";

import loanRepository from "../loan/loan.repository";
import repaymentRepository from "./repayment.repository";

interface CreateRepaymentDto {
  receiptNumber: string;
  loanId: string;
  amountPaid: number;
  paymentMethod: RepaymentMethod;
  transactionReference?: string;
  receivedById?: string;
  paymentDate?: Date;
  remarks?: string;
}

class RepaymentService {
  async create(
    data: CreateRepaymentDto
  ): Promise<Repayment> {
    const loan =
      await loanRepository.findById(
        data.loanId
      );

    if (!loan) {
      throw new NotFoundError(
        "Loan not found."
      );
    }

    if (loan.status === LoanStatus.REJECTED) {
      throw new ForbiddenError(
        "Cannot record repayment for a rejected loan."
      );
    }

    if (loan.status === LoanStatus.COMPLETED) {
      throw new ForbiddenError(
        "Cannot record repayment for a completed loan."
      );
    }

    const existingReceipt =
      await repaymentRepository.findByReceiptNumber(
        data.receiptNumber
      );

    if (existingReceipt) {
      throw new ConflictError(
        `Repayment with receipt number "${data.receiptNumber}" already exists.`
      );
    }

    const totalOutstanding =
      Number(loan.outstandingPrincipal) +
      Number(loan.outstandingInterest) +
      Number(loan.outstandingPenalty);

    if (totalOutstanding <= 0) {
      throw new ForbiddenError(
        "Loan has already been fully repaid."
      );
    }

    if (data.amountPaid <= 0) {
      throw new ForbiddenError(
        "Repayment amount must be greater than zero."
      );
    }

    if (data.amountPaid > totalOutstanding) {
      throw new ForbiddenError(
        `Amount paid exceeds outstanding balance of ${totalOutstanding}.`
      );
    }

    const allocation =
      allocateRepayment(
        data.amountPaid,
        Number(
          loan.outstandingPenalty
        ),
        Number(
          loan.outstandingInterest
        ),
        Number(
          loan.outstandingPrincipal
        )
      );

    const isLoanSettled =
      allocation.remainingPrincipal ===
        0 &&
      allocation.remainingInterest ===
        0 &&
      allocation.remainingPenalty ===
        0;

    const status = isLoanSettled
      ? LoanStatus.COMPLETED
      : loan.status;

    const result =
      await prisma.$transaction(
        async (tx) => {
          const repayment =
            await tx.repayment.create({
              data: {
                receiptNumber:
                  data.receiptNumber,

                loan: {
                  connect: {
                    id: loan.id,
                  },
                },

                amountPaid:
                  new Prisma.Decimal(
                    data.amountPaid
                  ),

                principalPaid:
                  new Prisma.Decimal(
                    allocation.principalPaid
                  ),

                interestPaid:
                  new Prisma.Decimal(
                    allocation.interestPaid
                  ),

                penaltyPaid:
                  new Prisma.Decimal(
                    allocation.penaltyPaid
                  ),

                paymentMethod:
                  data.paymentMethod,

                transactionReference:
                  data.transactionReference,

                paymentDate:
                  data.paymentDate,

                remarks:
                  data.remarks,

                receivedBy:
                  data.receivedById
                    ? {
                        connect: {
                          id: data.receivedById,
                        },
                      }
                    : undefined,
              },
            });
          await tx.loan.update({
            where: {
              id: loan.id,
            },
            data: {
              outstandingPrincipal:
                new Prisma.Decimal(
                  allocation.remainingPrincipal
                ),

              outstandingInterest:
                new Prisma.Decimal(
                  allocation.remainingInterest
                ),

              outstandingPenalty:
                new Prisma.Decimal(
                  allocation.remainingPenalty
                ),

              status,

              ...(isLoanSettled && {
                closedAt: new Date(),
              }),
            },
          });

          await tx.loanTransaction.create({
            data: {
              loan: {
                connect: {
                  id: loan.id,
                },
              },

              transactionType:
                TransactionType.REPAYMENT,

              amount:
                new Prisma.Decimal(
                  data.amountPaid
                ),

              principalComponent:
                new Prisma.Decimal(
                  allocation.principalPaid
                ),

              interestComponent:
                new Prisma.Decimal(
                  allocation.interestPaid
                ),

              penaltyComponent:
                new Prisma.Decimal(
                  allocation.penaltyPaid
                ),

              balanceAfter:
                new Prisma.Decimal(
                  allocation.remainingPrincipal +
                    allocation.remainingInterest +
                    allocation.remainingPenalty
                ),

              reference:
                data.transactionReference ??
                data.receiptNumber,

              narration:
                "Loan repayment",

              createdBy:
                data.receivedById
                  ? {
                      connect: {
                        id: data.receivedById,
                      },
                    }
                  : undefined,
            },
          });

          return {
            repayment,
            status,
            allocation,
          };
        }
      );

    await auditLogService.log({
      entity:
        AuditEntity.LOAN,

      entityId: loan.id,

      action:
        AuditAction.REPAY,

      oldValues: {
        status: loan.status,

        outstandingPrincipal:
          loan.outstandingPrincipal,

        outstandingInterest:
          loan.outstandingInterest,

        outstandingPenalty:
          loan.outstandingPenalty,
      },

      newValues: {
        status:
          result.status,

        outstandingPrincipal:
          result.allocation
            .remainingPrincipal,

        outstandingInterest:
          result.allocation
            .remainingInterest,

        outstandingPenalty:
          result.allocation
            .remainingPenalty,

        amountPaid:
          data.amountPaid,

        principalPaid:
          result.allocation
            .principalPaid,

        interestPaid:
          result.allocation
            .interestPaid,

        penaltyPaid:
          result.allocation
            .penaltyPaid,

        paymentMethod:
          data.paymentMethod,

        receiptNumber:
          data.receiptNumber,

        transactionReference:
          data.transactionReference,
      },
    });

    return result.repayment;
  }

  async findAll(): Promise<Repayment[]> {
    return repaymentRepository.findAll();
  }

  async findById(
    id: string
  ): Promise<Repayment | null> {
    const repayment =
      await repaymentRepository.findById(
        id
      );

    if (!repayment) {
      throw new NotFoundError(
        "Repayment not found."
      );
    }

    return repayment;
  }

  async findByReceiptNumber(
    receiptNumber: string
  ): Promise<Repayment | null> {
    return repaymentRepository.findByReceiptNumber(
      receiptNumber
    );
  }

  async findByLoan(
    loanId: string
  ): Promise<Repayment[]> {
    const loan =
      await loanRepository.findById(
        loanId
      );

    if (!loan) {
      throw new NotFoundError(
        "Loan not found."
      );
    }

    return repaymentRepository.findByLoan(
      loanId
    );
  }

  async delete(
    id: string
  ): Promise<void> {
    const repayment =
      await repaymentRepository.findById(
        id
      );

    if (!repayment) {
      throw new NotFoundError(
        "Repayment not found."
      );
    }

    throw new ForbiddenError(
      "Repayment records cannot be deleted."
    );
  }
}

export default new RepaymentService();