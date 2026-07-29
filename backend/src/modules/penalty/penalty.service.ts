import { Prisma, PrismaClient } from "@prisma/client";
import penaltyRepository from "./penalty.repository";
import auditLogService from "../auditLog/auditLog.service";
import {
  AuditAction,
  AuditEntity,
} from "../../common/constants/audit.constants";

const prisma = new PrismaClient();

class PenaltyService {
  async run(userId?: string) {
    const loans = await penaltyRepository.getOverdueLoans();

    let processed = 0;
    let updated = 0;
    let skipped = 0;

    const today = new Date();

    for (const loan of loans) {
      processed++;

      await prisma.$transaction(async (tx) => {
        const alreadyApplied =
          await penaltyRepository.hasPenaltyAppliedToday(
            tx,
            loan.id,
            today
          );

        if (alreadyApplied) {
          skipped++;
          return;
        }

        const penaltyAmount = new Prisma.Decimal(
          loan.outstandingPrincipal
        )
          .mul(loan.penaltyRate)
          .div(100);

        const updatedLoan =
          await penaltyRepository.updateLoanPenalty(
            tx,
            loan.id,
            penaltyAmount
          );

        await penaltyRepository.createPenaltyRecord(tx, {
          loanId: loan.id,
          amount: penaltyAmount,
          penaltyRate: loan.penaltyRate,
          appliedDate: today,
        });

        await penaltyRepository.createLoanTransaction(tx, {
          loanId: loan.id,
          amount: penaltyAmount,
          balanceAfter: new Prisma.Decimal(
            updatedLoan.outstandingPrincipal
          )
            .add(updatedLoan.outstandingInterest)
            .add(updatedLoan.outstandingPenalty),
          reference: `PEN-${loan.loanNumber}-${today
            .toISOString()
            .slice(0, 10)}`,
          narration: "Daily overdue penalty applied.",
          createdById: userId,
        });

        await auditLogService.log({
          userId,
          entity: AuditEntity.LOAN,
          entityId: loan.id,
          action: AuditAction.APPLY_PENALTY,
          newValues: {
            loanNumber: loan.loanNumber,
            penaltyRate: loan.penaltyRate.toString(),
            penaltyAmount: penaltyAmount.toString(),
            outstandingPenalty:
              updatedLoan.outstandingPenalty.toString(),
          },
        });

        updated++;
      });
    }

    return {
      success: true,
      processed,
      updated,
      skipped,
    };
  }
}

export default new PenaltyService();