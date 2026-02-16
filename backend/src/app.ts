import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./shared/docs/swagger";
import { tagRoutes } from "./modules/tag/api/routes/tagRoutes";
import { taskRoutes } from "./modules/task/api/router/taskRoutes";
import { errorHandler } from "./shared/middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/tags", tagRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

export { app };
