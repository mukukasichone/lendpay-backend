import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import approvalController from "./approval.controller";

import { createApprovalSchema } from "./approval.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createApprovalSchema),
  approvalController.create
);

router.get("/", approvalController.findAll);

router.get("/:id", approvalController.findById);

export default router;