import { PriorityEnum } from "./enums/PriorityEnum";
import { StatusEnum } from "./enums/StatusEnum";

export class Task {
  constructor(
    public readonly id: number,
    public title: string,
    public description: string,
    public estimatedPomodoros: number,
    public startedAt: Date,
    public finishedAt: Date | null,
    public status: StatusEnum,
    public priority: PriorityEnum,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public tags: { id: number; name: string }[] = []
  ) {}
}
