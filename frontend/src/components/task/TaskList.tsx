import { TaskResponse } from "@/src/types/task/TaskResponse";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: TaskResponse[];
  onAddPomodoro: (id: number) => void;
}

export function TaskList({ tasks, onAddPomodoro }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
        <div className="text-4xl mb-4">📅</div>
        <p className="text-gray-400 font-medium">Nenhuma tarefa para hoje. <br/> Que tal planejar uma?</p>
      </div>
    );
  }

  return (
    <section className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onAddPomodoro={onAddPomodoro} 
        />
      ))}
    </section>
  );
}