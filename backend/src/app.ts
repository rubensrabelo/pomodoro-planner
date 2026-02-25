import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./shared/docs/swagger";
import { tagRoutes } from "./modules/tag/api/routes/tagRoutes";
import { taskRoutes } from "./modules/task/api/routes/taskRoutes";
import { taskTagRoutes } from "./modules/task/api/routes/taskTagRoutes";
import { pomodoroSessionRoutes } from "./modules/pomodoro-session/api/routes/pomodoroSessionRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();
const apiV1 = express.Router();

app.use(express.json());

apiV1.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
apiV1.use("/tags", tagRoutes);
apiV1.use("/tasks", taskRoutes);
apiV1.use("/tasks", taskTagRoutes);
apiV1.use("/pomodoros", pomodoroSessionRoutes);

app.use("/api/v1", apiV1);

app.use(errorHandler);

export { app };
