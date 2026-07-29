import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import creditAssessmentController from "./creditAssessment.controller";

import {
  createCreditAssessmentSchema,
  updateCreditAssessmentSchema,
} from "./creditAssessment.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createCreditAssessmentSchema),
  creditAssessmentController.create
);

router.get("/", creditAssessmentController.findAll);

router.get("/:id", creditAssessmentController.findById);

router.put(
  "/:id",
  validate(updateCreditAssessmentSchema),
  creditAssessmentController.update
);

router.delete("/:id", creditAssessmentController.delete);

export default router;