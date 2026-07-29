import { LoanApplicationStatus, Prisma } from "@prisma/client";

import { NotFoundError } from "../../common/errors";

import approvalRepository from "./approval.repository";
import loanApplicationRepository from "../loanApplication/loanApplication.repository";
import userRepository from "../user/user.repository";

import { CreateApprovalDto } from "./approval.validation";

import prisma from "../../config/prisma";

class ApprovalService {
  async create(data: CreateApprovalDto) {
    const application = await loanApplicationRepository.findById(
      data.applicationId
    );

    if (!application) {
      throw new NotFoundError("Loan application not found.");
    }

    const approver = await userRepository.findById(data.approverId);

    if (!approver) {
      throw new NotFoundError("Approver not found.");
    }

    return prisma.$transaction(async (tx) => {
      const approval = await tx.approval.create({
        data: {
          application: {
            connect: {
              id: data.applicationId,
            },
          },
          approver: {
            connect: {
              id: data.approverId,
            },
          },
          decision: data.decision,
          approvedAmount: data.approvedAmount,
          approvedTermDays: data.approvedTermDays,
          interestRate: data.interestRate,
          remarks: data.remarks,
        },
      });

      const status =
        data.decision === "APPROVED"
          ? LoanApplicationStatus.APPROVED
          : LoanApplicationStatus.REJECTED;

      await tx.loanApplication.update({
        where: {
          id: data.applicationId,
        },
        data: {
          status,
          approvedAt:
            status === LoanApplicationStatus.APPROVED
              ? new Date()
              : undefined,
          rejectedAt:
            status === LoanApplicationStatus.REJECTED
              ? new Date()
              : undefined,
          approvedById: data.approverId,
        },
      });

      await tx.loanApplicationHistory.create({
        data: {
          applicationId: data.applicationId,
          userId: data.approverId,
          action: `Application ${status}`,
          oldStatus: application.status,
          newStatus: status,
          remarks: data.remarks,
        },
      });

      return approval;
    });
  }

  async findAll() {
    return approvalRepository.findAll();
  }

  async findById(id: string) {
    const approval = await approvalRepository.findById(id);

    if (!approval) {
      throw new NotFoundError("Approval not found.");
    }

    return approval;
  }
}

export default new ApprovalService();