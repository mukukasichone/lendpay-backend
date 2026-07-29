import { Router } from "express";
import dashboardController from "./dashboard.controller";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.get(
  "/summary",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN", "MANAGER"),
  dashboardController.getSummary
);

export default router;