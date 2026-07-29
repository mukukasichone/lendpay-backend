import { Router } from "express";
import { UserRole } from "@prisma/client";

import loanProductController from "./loanProduct.controller";
import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { createLoanProductSchema } from "./loanProduct.validation";

const router = Router();

// All loan product routes require authentication
router.use(authenticate);

// Create loan product
router.post(
  "/",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER
  ),
  validate(createLoanProductSchema),
  loanProductController.create
);

// View loan products
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
  loanProductController.findAll
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
  loanProductController.findById
);

// Update loan product
router.put(
  "/:id",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER
  ),
  loanProductController.update
);

// Activate / Deactivate loan product
router.patch(
  "/:id/deactivate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  loanProductController.deactivate
);

router.patch(
  "/:id/activate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  loanProductController.activate
);

export default router;