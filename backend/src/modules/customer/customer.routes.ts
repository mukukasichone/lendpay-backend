import { Router } from "express";
import customerController from "./customer.controller";
import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { UserRole } from "@prisma/client";
import { createCustomerSchema } from "./customer.validation";

const router = Router();

// All customer routes require authentication
router.use(authenticate);

// Customer creation
router.post(
  "/",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER
  ),
  validate(createCustomerSchema),
  customerController.createCustomer
);

// View customers
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
  customerController.getAllCustomers
);

router.get(
  "/id/:id",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  customerController.findCustomerById
);

router.get(
  "/number/:customerNo",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  customerController.findCustomerByCustomerNo
);

router.get(
  "/mobile/:mobileNumber",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER,
    UserRole.COLLECTIONS,
    UserRole.VIEWER
  ),
  customerController.findCustomerByMobileNumber
);

// Update customer
router.put(
  "/:id",
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.LOAN_OFFICER
  ),
  customerController.updateCustomer
);

// Activate / Deactivate customer
router.patch(
  "/:id/deactivate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  customerController.deactivateCustomer
);

router.patch(
  "/:id/activate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  customerController.activateCustomer
);

export default router;