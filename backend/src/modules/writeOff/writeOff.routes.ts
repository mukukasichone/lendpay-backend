import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import writeOffController from "./writeOff.controller";

import {
  createWriteOffSchema,
} from "./writeOff.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createWriteOffSchema),
  writeOffController.create
);

router.get(
  "/",
  writeOffController.findAll
);

router.get(
  "/:id",
  writeOffController.findById
);

export default router;