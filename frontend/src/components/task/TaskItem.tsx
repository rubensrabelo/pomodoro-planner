import { TaskResponse } from "@/src/types/task/TaskResponse";

interface TaskItemProps {
  task: TaskResponse;
  onAddPomodoro: (id: number) => void;
}

export function TaskItem({ task, onAddPomodoro }: TaskItemProps) {
  const isCompleted = task.status === "COMPLETED";

  const priorityStyles = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-blue-100 text-blue-600",
  };

  const priorityLabels = {
    HIGH: "Alta",
    MEDIUM: "Média",
    LOW: "Baixa",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300 hover:border-red-200 transition-colors">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${priorityStyles[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
          <h3 className={`font-bold text-lg ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {task.title}
          </h3>
        </div>
        
        {task.description && (
          <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
        )}

        <div className="flex gap-2">
          {task.tags?.map(tag => (
            <span key={tag.id} className="text-[10px] bg-gray-50 text-gray-500 border border-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">Estimativa</p>
          <p className="text-xl font-black text-gray-800">
             {task.estimatedPomodoros} 🍅
          </p>
        </div>
        <button
          onClick={() => onAddPomodoro(task.id)}
          disabled={isCompleted}
          className={`p-3 rounded-full transition-all ${
            isCompleted 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white shadow-sm'
          }`}
        >
          {isCompleted ? '✓' : '✅'}
        </button>
      </div>
    </div>
  );
}