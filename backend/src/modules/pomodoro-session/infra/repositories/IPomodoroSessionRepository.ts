import { RepositoryPagination } from "@/modules/types/RepositoryPagination";
import { CreatePomodoroSessionDTO } from "../../application/dtos/CreatePomodoroSessionDTO";
import { UpdatePomodoroSessionDTO } from "../../application/dtos/UpdatePomodoroSessionDTO";
import { PomodoroSession } from "../../domain/PomodoroSession";

export interface IPomodoroSessionRepository {
  findAll(params: RepositoryPagination): Promise<[PomodoroSession[], number]>;
  findById(id: number): Promise<PomodoroSession | null>;
  findByTaskId(taskId: number): Promise<PomodoroSession[]>;
  create(data: CreatePomodoroSessionDTO): Promise<PomodoroSession>;
  complete(id: number, finishedAt: Date): Promise<PomodoroSession>;
  update(id: number, data: UpdatePomodoroSessionDTO): Promise<PomodoroSession>;
  delete(id: number): Promise<void>;
}
