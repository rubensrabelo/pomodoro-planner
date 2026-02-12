import { Router } from "express";
import { tagController } from "../../infra/container/tag.container";
import { handleAsync } from "../../../../shared/utils/asyncHandler";
import { validate } from "../../../../shared/middlewares/validate";
import {
  createTagRequestSchema,
  updateTagRequestSchema,
  tagIdParamSchema,
} from "../../validators/tagSchemas";

const tagRoutes = Router();

tagRoutes.get(
  "/",
  handleAsync((req, res) => tagController.findAll(req, res))
);

tagRoutes.get(
  "/:id",
  validate(tagIdParamSchema),
  handleAsync((req, res) => tagController.findById(req, res))
);

tagRoutes.post(
  "/",
  validate(createTagRequestSchema),
  handleAsync((req, res) => tagController.create(req, res))
);

tagRoutes.put(
  "/:id",
  validate(updateTagRequestSchema),
  handleAsync((req, res) => tagController.update(req, res))
);

tagRoutes.delete(
  "/:id",
  validate(tagIdParamSchema),
  handleAsync((req, res) => tagController.delete(req, res))
);

export { tagRoutes };
