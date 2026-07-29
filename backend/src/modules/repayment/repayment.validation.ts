import { z } from "zod";
import { RepaymentMethod } from "@prisma/client";

export const createRepaymentSchema = z.object({
  receiptNumber: z
    .string()
    .trim()
    .min(1, "Receipt number is required."),

  loanId: z
    .string()
    .trim()
    .min(1, "Loan id is required."),

  amountPaid: z.coerce
    .number()
    .positive("Amount paid must be greater than 0."),

  paymentMethod: z.nativeEnum(RepaymentMethod),

  transactionReference: z
    .string()
    .trim()
    .optional(),

  receivedById: z
    .string()
    .trim()
    .optional(),

  paymentDate: z.coerce
    .date()
    .optional(),

  remarks: z.string().optional(),
});

export type CreateRepaymentDto = z.infer<
  typeof createRepaymentSchema
>;