import { Router } from "express";

import { handleAsync } from "../../../../shared/utils/asyncHandler";
import { taskController } from "../../infra/container/taskContainer";
import { validate } from "../../../../shared/middlewares/validate";
import {
  createTaskRequestSchema,
  updateTaskRequestSchema,
  taskIdParamSchema,
} from "../../validators/taskSchemas";

const taskRoutes = Router();

taskRoutes.get(
  "/",
  handleAsync((req, res) => taskController.findAll(req, res))
);

taskRoutes.get(
  "/:id",
  validate(taskIdParamSchema),
  handleAsync((req, res) => taskController.findById(req, res))
);

taskRoutes.post(
  "/",
  validate(createTaskRequestSchema),
  handleAsync((req, res) => taskController.create(req, res))
);

taskRoutes.put(
  "/:id",
  validate(updateTaskRequestSchema),
  handleAsync((req, res) => taskController.update(req, res))
);

taskRoutes.delete(
  "/:id",
  validate(taskIdParamSchema),
  handleAsync((req, res) => taskController.delete(req, res))
);

export { taskRoutes };
