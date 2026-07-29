import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import loanTransactionController from "./loanTransaction.controller";

import {
  createLoanTransactionSchema,
} from "./loanTransaction.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createLoanTransactionSchema),
  loanTransactionController.create
);

router.get("/", loanTransactionController.findAll);

router.get(
  "/loan/:loanId",
  loanTransactionController.findByLoan
);

router.get("/:id", loanTransactionController.findById);

export default router;