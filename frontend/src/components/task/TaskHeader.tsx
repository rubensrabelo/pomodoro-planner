interface HeaderProps {
  onOpenTags: () => void;
  onOpenNewTask: () => void;
}

export function TaskHeader({ onOpenTags, onOpenNewTask }: HeaderProps) {
  return (
    <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-red-100">
      <div>
        <h1 className="text-3xl font-extrabold text-red-600">PomoPlanner</h1>
        <p className="text-gray-500">Transforme tarefas em foco.</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onOpenTags}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
        >
          Tags
        </button>
        <button
          onClick={onOpenNewTask}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition shadow-md active:scale-95"
        >
          + Nova Tarefa
        </button>
      </div>
    </header>
  );
}