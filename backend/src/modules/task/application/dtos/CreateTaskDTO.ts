import { PriorityEnum } from "../../domain/enums/PriorityEnum"
import { StatusEnum } from "../../domain/enums/StatusEnum"

export interface CreateTaskDTO {
  title: string
  description: string
  estimatedPomodoros: number
  startedAt: Date
  finishedAt?: Date | null
  status?: StatusEnum
  priority?: PriorityEnum
}
