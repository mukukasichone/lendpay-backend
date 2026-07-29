import { z } from "zod";

import {
  CollectionStage,
  CollectionResult,
} from "@prisma/client";

export const createCollectionActivitySchema = z.object({
  loanId: z.string().min(1),

  officerId: z.string().optional(),

  stage: z.nativeEnum(CollectionStage),

  result: z.nativeEnum(CollectionResult),

  amountPromised: z.coerce.number().optional(),

  promisedPaymentDate: z.coerce.date().optional(),

  nextFollowUpDate: z.coerce.date().optional(),

  remarks: z.string().optional(),
});

export const updateCollectionActivitySchema =
  createCollectionActivitySchema
    .omit({
      loanId: true,
      officerId: true,
    })
    .partial();

export type CreateCollectionActivityDto =
  z.infer<typeof createCollectionActivitySchema>;

export type UpdateCollectionActivityDto =
  z.infer<typeof updateCollectionActivitySchema>;