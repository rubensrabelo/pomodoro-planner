import { PriorityEnum } from "./enums/PriorityEnum";
import { StatusEnum } from "./enums/StatusEnum";

export interface TaskBase {
  title: string;
  description: string;
  estimatedPomodoros: number;
  startedAt: string | Date;
  finishedAt: string | Date;
  status: StatusEnum;
  priority: PriorityEnum;
}
