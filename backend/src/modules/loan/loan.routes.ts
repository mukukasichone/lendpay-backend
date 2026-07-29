import { Router } from "express";
import { UserRole } from "@prisma/client";

import loanController from "./loan.controller";
import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { createLoanSchema } from "./loan.validation";

const router = Router();

// All loan routes require authentication
router.use(authenticate);

// Create loan
router.post(
  "/",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER
  ),
  validate(createLoanSchema),
  loanController.create
);

// View loans
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
  loanController.findAll
);

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
  loanController.findById
);

router.get(
  "/number/:loanNumber",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  loanController.findByLoanNumber
);

router.get(
  "/customer/:customerId",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  loanController.findByCustomer
);

// Update loan
router.put(
  "/:id",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER
  ),
  loanController.update
);

// Activate / Deactivate loan
router.patch(
  "/:id/deactivate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  loanController.deactivate
);

router.patch(
  "/:id/activate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  loanController.activate
);

export default router;