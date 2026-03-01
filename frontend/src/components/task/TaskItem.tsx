import { Task } from "@/src/types/task/Task";

export function TaskItem({ task, onAddPomodoro }: { task: Task; onAddPomodoro: (id: number) => void }) {
  const isCompleted = task.completedPomodoros >= task.estimatedPomodoros;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between animate-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            task.priority === 'Alta' ? 'bg-red-100 text-red-600' : 
            task.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-blue-100 text-blue-600'
          }`}>
            {task.priority}
          </span>
          <h3 className={`font-bold text-lg ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex gap-2">
          {task.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 border border-gray-100 px-2 py-1 rounded-full uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">Progresso</p>
          <p className="text-xl font-black text-gray-800">
            {task.completedPomodoros} / {task.estimatedPomodoros} 🍅
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
          ✅
        </button>
      </div>
    </div>
  );
}