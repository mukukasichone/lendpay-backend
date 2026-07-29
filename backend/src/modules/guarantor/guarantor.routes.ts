import { Router } from "express";
import guarantorController from "./guarantor.controller";
import { validate } from "../../middleware/validate.middleware";
import {
  createGuarantorSchema,
  updateGuarantorSchema,
} from "./guarantor.validation";
import { authenticate } from "../../middleware/authenticate.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validate(createGuarantorSchema),
  guarantorController.create
);

router.get("/", guarantorController.findAll);

router.get("/:id", guarantorController.findById);

router.put(
  "/:id",
  validate(updateGuarantorSchema),
  guarantorController.update
);

router.delete("/:id", guarantorController.delete);

export default router;