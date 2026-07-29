import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import loanApplicationController from "./loanApplication.controller";

import {
  createLoanApplicationSchema,
  updateLoanApplicationSchema,
  addGuarantorSchema,
} from "./loanApplication.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createLoanApplicationSchema),
  loanApplicationController.create
);

router.get("/", loanApplicationController.findAll);

router.get("/:id", loanApplicationController.findById);

router.put(
  "/:id",
  validate(updateLoanApplicationSchema),
  loanApplicationController.update
);

router.delete("/:id", loanApplicationController.delete);

router.post(
  "/:id/guarantors",
  validate(addGuarantorSchema),
  loanApplicationController.addGuarantor
);

export default router;