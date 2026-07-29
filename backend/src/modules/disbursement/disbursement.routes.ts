import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import disbursementController from "./disbursement.controller";

import {
  createDisbursementSchema,
} from "./disbursement.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createDisbursementSchema),
  disbursementController.create
);

router.get("/", disbursementController.findAll);

router.get("/:id", disbursementController.findById);

export default router;