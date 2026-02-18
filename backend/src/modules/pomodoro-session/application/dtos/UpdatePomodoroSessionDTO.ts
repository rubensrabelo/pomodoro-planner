export interface UpdatePomodoroSessionDTO {
  id: number;
  startedAt: Date;
  finishedAt?: Date | null;
  durationMinutes?: number;
  isCompleted?: boolean;
}
