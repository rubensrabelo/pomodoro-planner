export class PomodoroSession {
  constructor(
    public readonly id: number,
    public startedAt: Date,
    public finishedAt: Date | null,
    public durationMinutes: number,
    public isCompleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    
    public taskId: number
  ) {}
}
