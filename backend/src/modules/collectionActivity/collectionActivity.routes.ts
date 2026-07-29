import { Router } from "express";

import { authenticate } from "../../middleware/authenticate.middleware";
import { validate } from "../../middleware/validate.middleware";

import collectionActivityController from "./collectionActivity.controller";

import {
  createCollectionActivitySchema,
  updateCollectionActivitySchema,
} from "./collectionActivity.validation";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createCollectionActivitySchema),
  collectionActivityController.create
);

router.get(
  "/",
  collectionActivityController.findAll
);

router.get(
  "/loan/:loanId",
  collectionActivityController.findByLoan
);

router.get(
  "/:id",
  collectionActivityController.findById
);

router.patch(
  "/:id",
  validate(updateCollectionActivitySchema),
  collectionActivityController.update
);

export default router;