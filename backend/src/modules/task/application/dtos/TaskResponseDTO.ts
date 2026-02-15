import { PriorityEnum } from "../../domain/enums/PriorityEnum"
import { StatusEnum } from "../../domain/enums/StatusEnum"

export interface TaskResponseDTO {
  id: number
  title: string
  description: string
  estimatedPomodoros: number
  startedAt: Date | null
  finishedAt: Date | null
  status: StatusEnum
  priority: PriorityEnum
  createdAt: Date
  updatedAt: Date
}
