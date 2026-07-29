import { z } from "zod";

export const createApprovalSchema = z.object({
  applicationId: z.string().min(1, "Application is required."),
  approverId: z.string().min(1, "Approver is required."),

  decision: z.enum([
    "RECOMMEND_APPROVAL",
    "RECOMMEND_REJECTION",
    "APPROVED",
    "REJECTED",
  ]),

  approvedAmount: z.coerce.number().positive().optional(),

  approvedTermDays: z.coerce.number().int().positive().optional(),

  interestRate: z.coerce.number().positive().optional(),

  remarks: z.string().optional(),
});

export type CreateApprovalDto = z.infer<typeof createApprovalSchema>;