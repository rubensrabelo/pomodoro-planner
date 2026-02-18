import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./shared/docs/swagger";
import { tagRoutes } from "./modules/tag/api/routes/tagRoutes";
import { taskRoutes } from "./modules/task/api/routes/taskRoutes";
import { taskTagRoutes } from "./modules/task/api/routes/taskTagRoutes";
import { pomodoroSessionRoutes } from "./modules/pomodoro-session/api/routes/pomodoroSessionRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/tags", tagRoutes);
app.use("/tasks", taskRoutes);
app.use("/tasks", taskTagRoutes);
app.use("/pomodoros", pomodoroSessionRoutes);

app.use(errorHandler);

export { app };
