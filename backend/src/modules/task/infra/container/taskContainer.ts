import { TaskController } from "../../api/controllers/TaskController";
import { TaskService } from "../../application/services/TaskService";
import { PrismaTaskRepository } from "../repositories/PrismaTaskRepository";

const taskRepository = new PrismaTaskRepository();

const taskService = new TaskService(taskRepository);

const taskController = new TaskController(taskService);

export { taskController };
