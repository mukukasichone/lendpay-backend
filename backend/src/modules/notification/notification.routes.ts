import { Router } from "express";
import notificationController from "./notification.controller";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN"),
  notificationController.getAll
);

router.get(
  "/my",
  authenticate,
  notificationController.getMine
);

router.patch(
  "/:id/read",
  authenticate,
  notificationController.markAsRead
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN"),
  notificationController.delete
);

export default router;