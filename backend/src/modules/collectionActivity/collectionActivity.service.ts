import { LoanStatus, Prisma } from "@prisma/client";

import {
  ForbiddenError,
  NotFoundError,
} from "../../common/errors";

import loanRepository from "../loan/loan.repository";
import userRepository from "../user/user.repository";

import collectionActivityRepository from "./collectionActivity.repository";

import {
  CreateCollectionActivityDto,
  UpdateCollectionActivityDto,
} from "./collectionActivity.validation";

class CollectionActivityService {
  async create(
    data: CreateCollectionActivityDto
  ) {
    const loan =
      await loanRepository.findById(data.loanId);

    if (!loan) {
      throw new NotFoundError(
        "Loan not found."
      );
    }

    if (
      loan.status === LoanStatus.REJECTED ||
      loan.status === LoanStatus.COMPLETED ||
      loan.status === LoanStatus.WRITTEN_OFF
    ) {
      throw new ForbiddenError(
        "Collection activity cannot be recorded for this loan."
      );
    }

    if (data.officerId) {
      const officer =
        await userRepository.findById(
          data.officerId
        );

      if (!officer) {
        throw new NotFoundError(
          "Officer not found."
        );
      }
    }

    return collectionActivityRepository.create({
      loan: {
        connect: {
          id: data.loanId,
        },
      },

      officer: data.officerId
        ? {
            connect: {
              id: data.officerId,
            },
          }
        : undefined,

      stage: data.stage,

      result: data.result,

      amountPromised:
        data.amountPromised !== undefined
          ? new Prisma.Decimal(
              data.amountPromised
            )
          : undefined,

      promisedPaymentDate:
        data.promisedPaymentDate,

      nextFollowUpDate:
        data.nextFollowUpDate,

      remarks: data.remarks,
    });
  }

  async update(
    id: string,
    data: UpdateCollectionActivityDto
  ) {
    const activity =
      await collectionActivityRepository.findById(
        id
      );

    if (!activity) {
      throw new NotFoundError(
        "Collection activity not found."
      );
    }

    return collectionActivityRepository.update(
      id,
      {
        stage: data.stage,

        result: data.result,

        amountPromised:
          data.amountPromised !== undefined
            ? new Prisma.Decimal(
                data.amountPromised
              )
            : undefined,

        promisedPaymentDate:
          data.promisedPaymentDate,

        nextFollowUpDate:
          data.nextFollowUpDate,

        remarks: data.remarks,
      }
    );
  }

  async findAll() {
    return collectionActivityRepository.findAll();
  }

  async findById(id: string) {
    const activity =
      await collectionActivityRepository.findById(
        id
      );

    if (!activity) {
      throw new NotFoundError(
        "Collection activity not found."
      );
    }

    return activity;
  }

  async findByLoan(
    loanId: string
  ) {
    const loan =
      await loanRepository.findById(loanId);

    if (!loan) {
      throw new NotFoundError(
        "Loan not found."
      );
    }

    return collectionActivityRepository.findByLoan(
      loanId
    );
  }
}

export default new CollectionActivityService();