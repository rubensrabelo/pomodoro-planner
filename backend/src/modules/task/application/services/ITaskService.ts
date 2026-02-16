import { CreateTaskDTO } from "../dtos/CreateTaskDTO";
import { TaskResponseDTO } from "../dtos/TaskResponseDTO";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO";

export interface ITaskService {
  findAll(): Promise<TaskResponseDTO[]>
  findById(id: number): Promise<TaskResponseDTO>
  create(data: CreateTaskDTO): Promise<TaskResponseDTO>
  update(id: number, data: UpdateTaskDTO): Promise<TaskResponseDTO>
  delete(id: number): Promise<void>
}
