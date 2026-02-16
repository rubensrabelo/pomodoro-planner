import { Router } from "express";
import { handleAsync } from "@/shared/utils/asyncHandler";
import { taskTagController } from "../../infra/container/taskTagContainer";

const taskTagRoutes = Router();

taskTagRoutes.post(
  "/:taskId/tags/:tagId",
  handleAsync((req, res) => taskTagController.addTag(req, res))
);

taskTagRoutes.delete(
  "/:taskId/tags/:tagId",
  handleAsync((req, res) => taskTagController.removeTag(req, res))
);

export { taskTagRoutes };
