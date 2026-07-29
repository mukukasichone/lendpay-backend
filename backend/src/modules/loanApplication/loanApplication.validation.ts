import { z } from "zod";

export const createLoanApplicationSchema = z.object({
  customerId: z.string().min(1, "Customer is required."),
  loanProductId: z.string().min(1, "Loan product is required."),
  requestedAmount: z.coerce.number().positive("Requested amount must be greater than zero."),
  requestedTermDays: z.coerce.number().int().positive("Requested term must be greater than zero."),
  purpose: z.enum([
    "PERSONAL",
    "BUSINESS",
    "EDUCATION",
    "MEDICAL",
    "AGRICULTURE",
    "EMERGENCY",
    "OTHER",
  ]),
  purposeDescription: z.string().optional(),
  remarks: z.string().optional(),
});

export const updateLoanApplicationSchema =
  createLoanApplicationSchema.partial();

export const addGuarantorSchema = z.object({
  guarantorId: z.string().min(1, "Guarantor is required."),
  relationship: z.enum([
    "SPOUSE",
    "PARENT",
    "CHILD",
    "SIBLING",
    "RELATIVE",
    "FRIEND",
    "EMPLOYER",
    "COLLEAGUE",
    "OTHER",
  ]),
});

export type CreateLoanApplicationDto = z.infer<
  typeof createLoanApplicationSchema
>;

export type UpdateLoanApplicationDto = z.infer<
  typeof updateLoanApplicationSchema
>;

export type AddGuarantorDto = z.infer<
  typeof addGuarantorSchema
>;