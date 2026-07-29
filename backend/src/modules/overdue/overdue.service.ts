import prisma from "../../config/prisma";
import { LoanStatus, TransactionType } from "@prisma/client";

import overdueRepository from "./overdue.repository";
import auditLogService from "../auditLog/auditLog.service";

import {
  AuditAction,
  AuditEntity,
} from "../../common/constants/audit.constants";

class OverdueService {
  async run() {
    const loans =
      await overdueRepository.findActivePastMaturity();

    let updated = 0;
    let skipped = 0;

    for (const loan of loans) {
      await prisma.$transaction(async (tx) => {
        await tx.loan.update({
          where: {
            id: loan.id,
          },
          data: {
            status: LoanStatus.OVERDUE,
          },
        });

        await tx.loanTransaction.create({
          data: {
            loanId: loan.id,
            transactionType: TransactionType.OVERDUE,
            amount: 0,
            principalComponent: 0,
            interestComponent: 0,
            penaltyComponent: 0,
            balanceAfter:
              Number(loan.outstandingPrincipal) +
              Number(loan.outstandingInterest) +
              Number(loan.outstandingPenalty),
            narration:
              "Loan automatically marked overdue",
          },
        });
      });

      await auditLogService.log({
        entity: AuditEntity.LOAN,
        entityId: loan.id,
        action: AuditAction.MARK_OVERDUE,
        oldValues: {
          status: LoanStatus.ACTIVE,
        },
        newValues: {
          status: LoanStatus.OVERDUE,
        },
      });

      updated++;
    }

    return {
      success: true,
      processed: loans.length,
      updated,
      skipped,
    };
  }
}

export default new OverdueService();