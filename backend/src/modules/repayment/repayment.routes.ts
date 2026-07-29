import { Router } from "express";
import { UserRole } from "@prisma/client";

import repaymentController from "./repayment.controller";
import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { createRepaymentSchema } from "./repayment.validation";

const router = Router();

// All repayment routes require authentication
router.use(authenticate);

// Create repayment
router.post(
  "/",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.COLLECTIONS
  ),
  validate(createRepaymentSchema),
  repaymentController.create
);

// View all repayments
router.get(
  "/",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  repaymentController.findAll
);

// View repayment by ID
router.get(
  "/:id",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  repaymentController.findById
);

// View repayment by receipt number
router.get(
  "/receipt/:receiptNumber",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  repaymentController.findByReceiptNumber
);

// View repayments for a loan
router.get(
  "/loan/:loanId",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  repaymentController.findByLoan
);

export default router;