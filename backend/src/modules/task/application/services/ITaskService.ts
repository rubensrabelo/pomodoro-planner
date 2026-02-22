import { PaginationParams } from "@/modules/types/PaginationParams";
import { CreateTaskDTO } from "../dtos/CreateTaskDTO";
import { TaskResponseDTO } from "../dtos/TaskResponseDTO";
import { UpdateTaskDTO } from "../dtos/UpdateTaskDTO";
import { PaginatedResponse } from "@/modules/types/PaginatedResponse";

export interface ITaskService {
  findAll(params: PaginationParams): Promise<PaginatedResponse<TaskResponseDTO>>
  findById(id: number): Promise<TaskResponseDTO>
  create(data: CreateTaskDTO): Promise<TaskResponseDTO>
  update(id: number, data: UpdateTaskDTO): Promise<TaskResponseDTO>
  delete(id: number): Promise<void>
}
