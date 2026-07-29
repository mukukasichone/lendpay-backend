import { z } from "zod";

export const createAuditLogSchema = z.object({
  userId: z.string().optional(),

  entity: z.string().min(1),

  entityId: z.string().min(1),

  action: z.string().min(1),

  oldValues: z.any().optional(),

  newValues: z.any().optional(),

  ipAddress: z.string().optional(),

  userAgent: z.string().optional(),
});

export type CreateAuditLogDto =
  z.infer<typeof createAuditLogSchema>;