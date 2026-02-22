import { RepositoryPagination } from "@/modules/types/RepositoryPagination";
import { prisma } from "../../../../infra/prisma/client";
import { EntityNotFoundError } from "../../../../shared/errors";
import { CreatePomodoroSessionDTO } from "../../application/dtos/CreatePomodoroSessionDTO";
import { UpdatePomodoroSessionDTO } from "../../application/dtos/UpdatePomodoroSessionDTO";
import { PomodoroSession } from "../../domain/PomodoroSession";
import { IPomodoroSessionRepository } from "./IPomodoroSessionRepository";

export class PrismaPomodoroSessionRepository
  implements IPomodoroSessionRepository {

  async findAll(params: RepositoryPagination): Promise<[PomodoroSession[], number]> {
    const [sessions, total] = await Promise.all([
      prisma.pomodoroSession.findMany({
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.pomodoroSession.count(),
    ]);

    return [
      sessions.map((s) => this.toDomain(s)),
      total,
    ];
  }

  async findById(id: number): Promise<PomodoroSession | null> {
    const session = await prisma.pomodoroSession.findUnique({
      where: { id }
    });

    if (!session) return null;

    return this.toDomain(session);
  }

  async findByTaskId(taskId: number): Promise<PomodoroSession[]> {
    const sessions = await prisma.pomodoroSession.findMany({
      where: { taskId },
      orderBy: { startedAt: "asc" }
    });

    return sessions.map((s) => this.toDomain(s));
  }

  async create(data: CreatePomodoroSessionDTO): Promise<PomodoroSession> {
    const session = await prisma.pomodoroSession.create({
      data: {
        startedAt: data.startedAt,
        durationMinutes: data.durationMinutes,
        taskId: data.taskId
      }
    });

    return this.toDomain(session);
  }

  async complete(id: number, finishedAt: Date): Promise<PomodoroSession> {
    try {
      const session = await prisma.pomodoroSession.update({
        where: { id },
        data: {
          finishedAt,
          isCompleted: true
        }
      });

      return this.toDomain(session);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("PomodoroSession");
      }
      throw err;
    }
  }

  async update(
    id: number,
    data: UpdatePomodoroSessionDTO
  ): Promise<PomodoroSession> {
    try {
      const updated = await prisma.pomodoroSession.update({
        where: { id },
        data
      });

      return this.toDomain(updated);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("PomodoroSession");
      }
      throw err;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.pomodoroSession.delete({
        where: { id }
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("PomodoroSession");
      }
      throw err;
    }
  }

  private toDomain(data: PomodoroSession): PomodoroSession {
    return new PomodoroSession(
      data.id,
      data.startedAt,
      data.finishedAt,
      data.durationMinutes,
      data.isCompleted,
      data.createdAt,
      data.updatedAt,
      data.taskId
    );
  }
}
