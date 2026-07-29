import { z } from "zod";

export const createCreditAssessmentSchema = z.object({
  applicationId: z.string().min(1, "Application is required."),
  assessorId: z.string().min(1, "Assessor is required."),
  creditScore: z.coerce.number().int().min(0).max(100).optional(),
  affordabilityScore: z.coerce.number().int().min(0).max(100).optional(),
  debtServiceRatio: z.coerce.number().nonnegative().optional(),
  recommendation: z.enum([
  "PENDING",
  "RECOMMEND_APPROVAL",
  "RECOMMEND_REJECTION",
  "APPROVED",
  "REJECTED",
]),
  remarks: z.string().optional(),
});

export const updateCreditAssessmentSchema =
  createCreditAssessmentSchema.partial();

export type CreateCreditAssessmentDto = z.infer<
  typeof createCreditAssessmentSchema
>;

export type UpdateCreditAssessmentDto = z.infer<
  typeof updateCreditAssessmentSchema
>;