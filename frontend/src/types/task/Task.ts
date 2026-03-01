export interface Task {
  id: number;
  title: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  tags: string[];
  priority: "Baixa" | "Média" | "Alta";
}
