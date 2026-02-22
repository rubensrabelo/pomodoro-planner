import { IPomodoroSessionService } from "./IPomodoroSessionService";
import { IPomodoroSessionRepository } from "../../infra/repositories/IPomodoroSessionRepository";
import { CreatePomodoroSessionDTO } from "../dtos/CreatePomodoroSessionDTO";
import { UpdatePomodoroSessionDTO } from "../dtos/UpdatePomodoroSessionDTO";
import { PomodoroSessionResponseDTO } from "../dtos/PomodoroSessionResponseDTO";
import { PomodoroSession } from "../../domain/PomodoroSession";
import {
  EntityNotFoundError,
  NotFoundError
} from "../../../../shared/errors";
import { CompletePomodoroSessionDTO } from "../dtos/CompletePomodoroSessionDTO";
import { PaginationParams } from "@/modules/types/PaginationParams";
import { PaginatedResponse } from "@/modules/types/PaginatedResponse";

export class PomodoroSessionService implements IPomodoroSessionService {
  constructor(
    private readonly pomodoroRepository: IPomodoroSessionRepository
  ) { }

  async findAll(params: PaginationParams): Promise<PaginatedResponse<PomodoroSessionResponseDTO>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;
    const [sessions, total] = await this.pomodoroRepository.findAll({
      skip,
      take: limit,
    });
    return {
      data: sessions.map(session => this.toResponseDTO(session)),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    }
  }

  async findById(id: number): Promise<PomodoroSessionResponseDTO> {
    const session = await this.pomodoroRepository.findById(id);

    if (!session)
      throw new NotFoundError("PomodoroSession not found");

    return this.toResponseDTO(session);
  }

  async findByTaskId(taskId: number): Promise<PomodoroSessionResponseDTO[]> {
    const sessions = await this.pomodoroRepository.findByTaskId(taskId);
    return sessions.map(this.toResponseDTO);
  }

  async create(
    data: CreatePomodoroSessionDTO
  ): Promise<PomodoroSessionResponseDTO> {
    const session = await this.pomodoroRepository.create({
      startedAt: data.startedAt,
      durationMinutes: data.durationMinutes,
      taskId: data.taskId
    });

    return this.toResponseDTO(session);
  }

  async complete(
    data: CompletePomodoroSessionDTO
  ): Promise<PomodoroSessionResponseDTO> {
    try {
      const session = await this.pomodoroRepository.complete(
        data.id,
        data.finishedAt
      );

      return this.toResponseDTO(session);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("PomodoroSession not found");
      }
      throw err;
    }
  }

  async update(
    data: UpdatePomodoroSessionDTO
  ): Promise<PomodoroSessionResponseDTO> {
    try {
      const session = await this.pomodoroRepository.update(
        data.id,
        data
      );

      return this.toResponseDTO(session);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("PomodoroSession not found");
      }
      throw err;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.pomodoroRepository.delete(id);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("PomodoroSession not found");
      }
      throw err;
    }
  }

  private toResponseDTO(
    session: PomodoroSession
  ): PomodoroSessionResponseDTO {
    return {
      id: session.id,
      startedAt: session.startedAt,
      finishedAt: session.finishedAt,
      durationMinutes: session.durationMinutes,
      isCompleted: session.isCompleted,
      taskId: session.taskId,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    };
  }
}
