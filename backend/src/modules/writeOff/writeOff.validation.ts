import { z } from "zod";

export const createWriteOffSchema = z.object({
  loanId: z.string().min(1),

  approvedById: z.string().min(1),

  amount: z.coerce.number().positive(),

  reason: z.string().min(3),
});

export type CreateWriteOffDto = z.infer<
  typeof createWriteOffSchema
>;