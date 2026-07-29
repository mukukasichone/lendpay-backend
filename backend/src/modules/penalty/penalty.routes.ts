import { Router } from "express";
import penaltyController from "./penalty.controller";
import { authenticate } from "../../middleware/authenticate.middleware";

const router = Router();

/**
 * POST /api/penalties/run
 */
router.post(
  "/run",
  authenticate,
  penaltyController.run
);

export default router;