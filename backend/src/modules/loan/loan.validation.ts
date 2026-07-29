import { z } from "zod";

export const createLoanSchema = z.object({
  loanNumber: z
    .string()
    .trim()
    .min(3, "loanNumber must be at least 3 characters")
    .max(30, "loanNumber must not exceed 30 characters"),
  customerId: z.string().trim().min(1, "customerId is required"),
  loanProductId: z.string().trim().min(1, "loanProductId is required"),
  principalAmount: z.number().gt(0, "principalAmount must be greater than 0"),
  interestRate: z.number().min(0, "interestRate must be at least 0"),
  processingFee: z.number().min(0, "processingFee must be at least 0").optional().default(0),
  penaltyRate: z.number().min(0, "penaltyRate must be at least 0").optional().default(0),
  interestCalculationMethod: z.enum(["SIMPLE_FIXED", "REDUCING_BALANCE"]),
  termDays: z.number().int("termDays must be an integer").gt(0, "termDays must be greater than 0"),
  currency: z.enum(["ZMW"]).optional().default("ZMW"),
  totalRepayable: z.number().gt(0, "totalRepayable must be greater than 0"),
  outstandingPrincipal: z.number().min(0, "outstandingPrincipal must be at least 0"),
  outstandingInterest: z.number().min(0, "outstandingInterest must be at least 0"),
  outstandingPenalty: z.number().min(0, "outstandingPenalty must be at least 0").optional().default(0),
  approvedAt: z.coerce.date().optional(),
  disbursedAt: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  isActive: z.boolean().optional().default(true),
});
