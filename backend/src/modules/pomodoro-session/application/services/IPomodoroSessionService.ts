import { CreatePomodoroSessionDTO } from "../dtos/CreatePomodoroSessionDTO";
import { UpdatePomodoroSessionDTO } from "../dtos/UpdatePomodoroSessionDTO";
import { CompletePomodoroSessionDTO } from "../dtos/CompletePomodoroSessionDTO";
import { PomodoroSessionResponseDTO } from "../dtos/PomodoroSessionResponseDTO";
import { PaginationParams } from "@/modules/types/PaginationParams";
import { PaginatedResponse } from "@/modules/types/PaginatedResponse";

export interface IPomodoroSessionService {
  findAll(params: PaginationParams): Promise<PaginatedResponse<PomodoroSessionResponseDTO>>;
  findById(id: number): Promise<PomodoroSessionResponseDTO>;
  findByTaskId(taskId: number): Promise<PomodoroSessionResponseDTO[]>;
  create(data: CreatePomodoroSessionDTO): Promise<PomodoroSessionResponseDTO>;
  complete(data: CompletePomodoroSessionDTO): Promise<PomodoroSessionResponseDTO>;
  update(data: UpdatePomodoroSessionDTO): Promise<PomodoroSessionResponseDTO>;
  delete(id: number): Promise<void>;
}
