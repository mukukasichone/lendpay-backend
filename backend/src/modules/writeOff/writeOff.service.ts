import { LoanStatus, Prisma, TransactionType } from "@prisma/client";
import auditLogService from "../auditLog/auditLog.service";
import prisma from "../../config/prisma";

import {
  BadRequestError,
  NotFoundError,
} from "../../common/errors";

import {
  AuditAction,
  AuditEntity,
} from "../../common/constants/audit.constants";


import loanRepository from "../loan/loan.repository";
import userRepository from "../user/user.repository";
import writeOffRepository from "./writeOff.repository";

import { CreateWriteOffDto } from "./writeOff.validation";

class WriteOffService {
  async create(data: CreateWriteOffDto) {
    const loan = await loanRepository.findById(data.loanId);

    if (!loan) {
      throw new NotFoundError("Loan not found.");
    }

    if (
      loan.status === LoanStatus.COMPLETED ||
      loan.status === LoanStatus.WRITTEN_OFF
    ) {
      throw new BadRequestError(
        "This loan cannot be written off."
      );
    }

    const existingWriteOff =
      await writeOffRepository.findByLoan(data.loanId);

    if (existingWriteOff) {
      throw new BadRequestError(
        "Loan has already been written off."
      );
    }

    const approver = await userRepository.findById(
      data.approvedById
    );

    if (!approver) {
      throw new NotFoundError(
        "Approving user not found."
      );
    }

    const writeOff = await prisma.$transaction(async (tx) => {
      const writeOff = await tx.writeOff.create({
        data: {
          amount: new Prisma.Decimal(data.amount),

          reason: data.reason,

          loan: {
            connect: {
              id: data.loanId,
            },
          },

          approvedBy: {
            connect: {
              id: data.approvedById,
            },
          },
        },
        include: {
          loan: true,
          approvedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
        },
      });

      await tx.loan.update({
        where: {
          id: data.loanId,
        },
        data: {
          status: LoanStatus.WRITTEN_OFF,
          isActive: false,
        },
      });

      await tx.loanTransaction.create({
        data: {
          loanId: data.loanId,

          transactionType:
            TransactionType.WRITE_OFF,

          amount: new Prisma.Decimal(data.amount),

          principalComponent:
            loan.outstandingPrincipal,

          interestComponent:
            loan.outstandingInterest,

          penaltyComponent:
            loan.outstandingPenalty,

          balanceAfter: new Prisma.Decimal(0),

          narration: "Loan written off",

          reference: `WO-${Date.now()}`,
        },
      });

      return writeOff;
    });

    await auditLogService.log({
      userId: data.approvedById,

      entity: AuditEntity.LOAN,

      entityId: data.loanId,

      action: AuditAction.WRITE_OFF,

      oldValues: {
        status: loan.status,
        outstandingPrincipal: loan.outstandingPrincipal,
        outstandingInterest: loan.outstandingInterest,
        outstandingPenalty: loan.outstandingPenalty,
      },

      newValues: {
        status: LoanStatus.WRITTEN_OFF,
        outstandingPrincipal: 0,
        outstandingInterest: 0,
        outstandingPenalty: 0,
        amountWrittenOff: data.amount,
        reason: data.reason,
      },
    });

    return writeOff;
  }

  async findAll() {
    return writeOffRepository.findAll();
  }

  async findById(id: string) {
    const writeOff =
      await writeOffRepository.findById(id);

    if (!writeOff) {
      throw new NotFoundError(
        "Write-off not found."
      );
    }

    return writeOff;
  }
}

export default new WriteOffService();