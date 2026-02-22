import { ITaskService } from "./ITaskService";
import { ITaskRepository } from "../../infra/repositories/ITaskRepository";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO";
import { TaskResponseDTO } from "../dtos/TaskResponseDTO";
import { EntityNotFoundError, NotFoundError } from "@/shared/errors";
import { PrismaTaskWithTags } from "../../types/PrismaTaskWithTags";
import { PaginationParams } from "@/modules/types/PaginationParams";
import { PaginatedResponse } from "@/modules/types/PaginatedResponse";

export class TaskService implements ITaskService {
    constructor(private readonly taskRepository: ITaskRepository) { }

    async findAll(params: PaginationParams): Promise<PaginatedResponse<TaskResponseDTO>> {
        const { page, limit } = params;
        const skip = (page - 1) * limit;
        const [tasks, total] = await this.taskRepository.findAll({
            skip,
            take: limit,
        });

        return {
            data: tasks.map(task => this.toResponseDTO(task)),
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
                limit,
            },
        };
    }

    async findById(id: number): Promise<TaskResponseDTO> {
        const task = await this.taskRepository.findById(id)

        if (!task) {
            throw new NotFoundError("Task not found")
        }

        return this.toResponseDTO(task)
    }

    async create(data: CreateTaskDTO): Promise<TaskResponseDTO> {
        const task = await this.taskRepository.create(data)

        return this.toResponseDTO(task)
    }

    async update(id: number, data: UpdateTaskDTO): Promise<TaskResponseDTO> {
        try {
            const updatedTask = await this.taskRepository.update(id, data)

            return this.toResponseDTO(updatedTask)
        } catch (err: any) {
            if (err instanceof EntityNotFoundError) {
                throw new NotFoundError("Task not found");
            }
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.taskRepository.delete(id)
        } catch (err: any) {
            if (err instanceof EntityNotFoundError) {
                throw new NotFoundError("Task not found");
            }
            throw err;
        }
    }

    private toResponseDTO(task: PrismaTaskWithTags): TaskResponseDTO {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            estimatedPomodoros: task.estimatedPomodoros,
            startedAt: task.startedAt,
            finishedAt: task.finishedAt,
            status: task.status,
            priority: task.priority,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            tags: task.tags ?? [],
        }
    }

}
