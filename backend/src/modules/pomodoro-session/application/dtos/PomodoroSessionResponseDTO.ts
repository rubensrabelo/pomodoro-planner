export interface PomodoroSessionResponseDTO {
  id: number;
  startedAt: Date;
  finishedAt: Date | null;
  durationMinutes: number;
  isCompleted: boolean;
  taskId: number;
  createdAt: Date;
  updatedAt: Date;
}
