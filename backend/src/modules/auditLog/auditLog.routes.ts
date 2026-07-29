import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import auditLogController from "./auditLog.controller";

import {
  createAuditLogSchema,
} from "./auditLog.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createAuditLogSchema),
  auditLogController.create
);

router.get(
  "/",
  auditLogController.findAll
);

router.get(
  "/:id",
  auditLogController.findById
);

export default router;