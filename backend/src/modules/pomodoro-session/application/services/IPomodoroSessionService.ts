import { CreatePomodoroSessionDTO } from "../dtos/CreatePomodoroSessionDTO";
import { UpdatePomodoroSessionDTO } from "../dtos/UpdatePomodoroSessionDTO";
import { CompletePomodoroSessionDTO } from "../dtos/CompletePomodoroSessionDTO";
import { PomodoroSessionResponseDTO } from "../dtos/PomodoroSessionResponseDTO";

export interface IPomodoroSessionService {
  findAll(): Promise<PomodoroSessionResponseDTO[]>;
  findById(id: number): Promise<PomodoroSessionResponseDTO>;
  findByTaskId(taskId: number): Promise<PomodoroSessionResponseDTO[]>;
  create(data: CreatePomodoroSessionDTO): Promise<PomodoroSessionResponseDTO>;
  complete(data: CompletePomodoroSessionDTO): Promise<PomodoroSessionResponseDTO>;
  update(data: UpdatePomodoroSessionDTO): Promise<PomodoroSessionResponseDTO>;
  delete(id: number): Promise<void>;
}
