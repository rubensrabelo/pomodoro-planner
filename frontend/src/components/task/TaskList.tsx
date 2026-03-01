import { Task } from "../../types/task/Task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onAddPomodoro: (id: number) => void;
}

export function TaskList({ tasks, onAddPomodoro }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
        <p className="text-gray-400">Nenhuma tarefa para hoje. Que tal planejar uma?</p>
      </div>
    );
  }

  return (
    <section className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onAddPomodoro={onAddPomodoro} />
      ))}
    </section>
  );
}