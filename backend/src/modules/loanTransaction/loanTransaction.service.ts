import { Prisma } from "@prisma/client";

import { NotFoundError } from "../../common/errors";

import loanRepository from "../loan/loan.repository";
import userRepository from "../user/user.repository";

import loanTransactionRepository from "./loanTransaction.repository";

import {
  CreateLoanTransactionDto,
} from "./loanTransaction.validation";

class LoanTransactionService {
  async create(data: CreateLoanTransactionDto) {
    const loan = await loanRepository.findById(data.loanId);

    if (!loan) {
      throw new NotFoundError("Loan not found.");
    }

    if (data.createdById) {
      const user = await userRepository.findById(data.createdById);

      if (!user) {
        throw new NotFoundError("User not found.");
      }
    }

    return loanTransactionRepository.create({
      loan: {
        connect: {
          id: data.loanId,
        },
      },

      createdBy: data.createdById
        ? {
            connect: {
              id: data.createdById,
            },
          }
        : undefined,

      transactionType: data.transactionType,

      amount: new Prisma.Decimal(data.amount),

      principalComponent: new Prisma.Decimal(
        data.principalComponent
      ),

      interestComponent: new Prisma.Decimal(
        data.interestComponent
      ),

      penaltyComponent: new Prisma.Decimal(
        data.penaltyComponent
      ),

      balanceAfter:
        data.balanceAfter !== undefined
          ? new Prisma.Decimal(data.balanceAfter)
          : undefined,

      reference: data.reference,

      narration: data.narration,
    });
  }

  async findAll() {
    return loanTransactionRepository.findAll();
  }

  async findById(id: string) {
    const transaction =
      await loanTransactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundError(
        "Loan transaction not found."
      );
    }

    return transaction;
  }

  async findByLoan(loanId: string) {
    const loan = await loanRepository.findById(loanId);

    if (!loan) {
      throw new NotFoundError("Loan not found.");
    }

    return loanTransactionRepository.findByLoan(
      loanId
    );
  }
}

export default new LoanTransactionService();