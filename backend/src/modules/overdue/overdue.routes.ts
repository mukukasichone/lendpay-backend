import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.middleware";

import overdueController from "./overdue.controller";

const router = Router();

router.use(authenticate);

router.post(
  "/run",
  overdueController.run
);

export default router;