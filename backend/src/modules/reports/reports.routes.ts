import { Router } from "express";
import reportsController from "./reports.controller";
import { authenticate } from "../../middleware/authenticate.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "ADMIN",
    "MANAGER",
    "CREDIT_MANAGER"
  ),
  reportsController.getReports
);

export default router;