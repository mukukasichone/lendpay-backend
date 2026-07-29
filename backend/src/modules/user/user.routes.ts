import { Router } from "express";
import { UserRole } from "@prisma/client";

import userController from "./user.controller";
import {
  createUserSchema,
  updateUserSchema,
} from "./user.validation";

import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Create user
router.post(
  "/",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validate(createUserSchema),
  userController.create
);

// Get all users
router.get(
  "/",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.findAll
);

// Get user by ID
router.get(
  "/:id",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.findById
);

// Update user
router.put(
  "/:id",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validate(updateUserSchema),
  userController.update
);

// Deactivate user
router.patch(
  "/:id/deactivate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.deactivate
);

// Activate user
router.patch(
  "/:id/activate",
  authorize(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.activate
);

// Delete user (SUPER_ADMIN only)
router.delete(
  "/:id",
  authorize(UserRole.SUPER_ADMIN),
  userController.delete
);

export default router;