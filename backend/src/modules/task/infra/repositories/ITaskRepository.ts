import { CreateTaskDTO } from "../../application/dtos/CreateTaskDTO"
import { UpdateTaskDTO } from "../../application/dtos/UpdateTaskDTO"
import { Task } from "../../domain/Task"

export interface ITaskRepository {
    findAll(): Promise<Task[]>
    findById(id: number): Promise<Task | null>
    create(data: CreateTaskDTO): Promise<Task>
    update(id: number, task: UpdateTaskDTO): Promise<Task>
    delete(id: number): Promise<void>
}
