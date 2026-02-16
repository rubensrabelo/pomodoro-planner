import { PrismaTaskTagRepository } from "../repositories/PrismaTaskTagRepository";
import { PrismaTaskRepository } from "../repositories/PrismaTaskRepository";
import { PrismaTagRepository } from "@/modules/tag/infra/repositories/PrismaTagRepository";
import { TaskTagService } from "../../application/services/TaskTagService";
import { TaskTagController } from "../../api/controllers/TaskTagController";

const taskTagRepository = new PrismaTaskTagRepository();
const taskRepository = new PrismaTaskRepository();
const tagRepository = new PrismaTagRepository();

const taskTagService = new TaskTagService(
  taskTagRepository,
  taskRepository,
  tagRepository
);

const taskTagController = new TaskTagController(taskTagService);

export { taskTagController };
