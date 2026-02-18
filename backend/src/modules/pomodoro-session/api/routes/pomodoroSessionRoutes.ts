import { Router } from "express";
import { handleAsync } from "../../../../shared/utils/asyncHandler";
import { validate } from "../../../../shared/middlewares/validate";
import { pomodoroSessionController } from "../../infra/container/pomodoroSessionContainer";
import {
  createPomodoroSessionRequestSchema,
  updatePomodoroSessionRequestSchema,
  completePomodoroSessionRequestSchema,
  pomodoroSessionIdParamSchema,
  taskIdParamSchema,
} from "../../validators/pomodoroSessionSchemas";

const pomodoroSessionRoutes = Router();

pomodoroSessionRoutes.get(
  "/",
  handleAsync((req, res) =>
    pomodoroSessionController.findAll(req, res)
  )
);

pomodoroSessionRoutes.get(
  "/:id",
  validate(pomodoroSessionIdParamSchema),
  handleAsync((req, res) =>
    pomodoroSessionController.findById(req, res)
  )
);

pomodoroSessionRoutes.get(
  "/task/:taskId",
  validate(taskIdParamSchema),
  handleAsync((req, res) =>
    pomodoroSessionController.findByTaskId(req, res)
  )
);

pomodoroSessionRoutes.post(
  "/",
  validate(createPomodoroSessionRequestSchema),
  handleAsync((req, res) =>
    pomodoroSessionController.create(req, res)
  )
);

pomodoroSessionRoutes.put(
  "/:id",
  validate(updatePomodoroSessionRequestSchema),
  handleAsync((req, res) =>
    pomodoroSessionController.update(req, res)
  )
);

pomodoroSessionRoutes.patch(
  "/:id/complete",
  validate(completePomodoroSessionRequestSchema),
  handleAsync((req, res) =>
    pomodoroSessionController.complete(req, res)
  )
);

pomodoroSessionRoutes.delete(
  "/:id",
  validate(pomodoroSessionIdParamSchema),
  handleAsync((req, res) =>
    pomodoroSessionController.delete(req, res)
  )
);

export { pomodoroSessionRoutes };
