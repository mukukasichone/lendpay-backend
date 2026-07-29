import { z } from "zod";

export const createDisbursementSchema = z.object({
  applicationId: z.string().min(1),

  disbursedById: z.string().min(1),

  amount: z.coerce.number().positive(),

  bankName: z.string().optional(),

  bankAccountNumber: z.string().optional(),

  mobileMoneyNumber: z.string().optional(),

  transactionReference: z.string().optional(),

  remarks: z.string().optional(),
});

export type CreateDisbursementDto = z.infer<
  typeof createDisbursementSchema
>;