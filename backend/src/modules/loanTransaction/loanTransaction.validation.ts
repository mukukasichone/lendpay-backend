import { z } from "zod";
import { TransactionType } from "@prisma/client";

export const createLoanTransactionSchema = z.object({
  loanId: z.string().min(1),

  transactionType: z.nativeEnum(TransactionType),

  amount: z.coerce.number().positive(),

  principalComponent: z.coerce.number().default(0),

  interestComponent: z.coerce.number().default(0),

  penaltyComponent: z.coerce.number().default(0),

  balanceAfter: z.coerce.number().optional(),

  reference: z.string().optional(),

  narration: z.string().optional(),

  createdById: z.string().optional(),
});

export type CreateLoanTransactionDto = z.infer<
  typeof createLoanTransactionSchema
>;