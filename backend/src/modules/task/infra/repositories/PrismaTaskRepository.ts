import { ITaskRepository } from "./ITaskRepository";
import { prisma } from "@/infra/prisma/client";
import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO";
import { Task } from "../../domain/Task";
import { UpdateTaskDTO } from "../../application/dtos/UpdateTaskDTO";
import { EntityNotFoundError } from "@/shared/errors";
import { PrismaTaskWithTags } from "../../types/PrismaTaskWithTags";
import { RepositoryPagination } from "@/modules/types/RepositoryPagination";

export class PrismaTaskRepository implements ITaskRepository {
    async findAll(params: RepositoryPagination): Promise<[Task[], number]> {
        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                skip: params.skip,
                take: params.take,
                orderBy: { createdAt: "asc" },
            }),
            prisma.task.count(),
        ]);

        return [
            tasks.map((t) => this.toDomain(t)),
            total
        ];
    }

    async findById(id: number): Promise<Task | null> {
        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                tags: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if (!task) return null;

        return this.toDomain(task);
    }

    async create(data: CreateTaskDTO): Promise<Task> {
        const task = await prisma.task.create({
            data: {
                ...data,
                status: data.status ?? "PENDING",
                priority: data.priority ?? "MEDIUM",
            },
        });

        return this.toDomain(task);
    }

    async update(id: number, data: UpdateTaskDTO): Promise<Task> {
        try {
            const updated = await prisma.task.update({
                where: { id },
                data,
            });

            return this.toDomain(updated);
        } catch (err: any) {
            if (err.code === "P2025") {
                throw new EntityNotFoundError("Task");
            }
            throw err;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await prisma.task.delete({
                where: { id },
            });
        } catch (err: any) {
            if (err.code === "P2025") {
                throw new EntityNotFoundError("Task");
            }
            throw err;
        }
    }

    private toDomain(data: PrismaTaskWithTags): Task {
        return new Task(
            data.id,
            data.title,
            data.description,
            data.estimatedPomodoros,
            data.startedAt,
            data.finishedAt,
            data.status,
            data.priority,
            data.createdAt,
            data.updatedAt,
            data.tags ?? []
        );
    }

}
