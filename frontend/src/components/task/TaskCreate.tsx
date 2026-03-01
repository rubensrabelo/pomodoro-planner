"use client";
import { useState } from "react";
import { Task } from "../../types/task/Task";

interface TaskCreateProps {
  availableTags: string[];
  onClose: () => void;
  onSave: (task: Task) => void;
}

export function TaskCreate({ availableTags, onClose, onSave }: TaskCreateProps) {
  const [newTask, setNewTask] = useState({
    title: "",
    estimated: 1,
    priority: "Média" as "Baixa" | "Média" | "Alta",
    selectedTags: [] as string[]
  });

  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      estimatedPomodoros: newTask.estimated,
      completedPomodoros: 0,
      tags: newTask.selectedTags,
      priority: newTask.priority
    };
    
    onSave(task);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Nova Tarefa</h2>
        <div className="space-y-4">
          <input
            placeholder="O que você vai fazer?"
            className="w-full p-3 border rounded-xl outline-red-500 text-gray-800"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-bold text-gray-600">Pomodoros</label>
              <input
                type="number" min="1"
                className="w-full p-3 border rounded-xl mt-1 text-gray-800"
                value={newTask.estimated}
                onChange={e => setNewTask({ ...newTask, estimated: Number(e.target.value) })}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-bold text-gray-600">Prioridade</label>
              <select
                className="w-full p-3 border rounded-xl mt-1 text-gray-800"
                value={newTask.priority}
                onChange={e => setNewTask({ ...newTask, priority: e.target.value as any })}
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Selecionar Tags</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const tags = newTask.selectedTags.includes(tag)
                      ? newTask.selectedTags.filter(t => t !== tag)
                      : [...newTask.selectedTags, tag];
                    setNewTask({ ...newTask, selectedTags: tags });
                  }}
                  className={`px-3 py-1 rounded-full text-xs transition ${
                    newTask.selectedTags.includes(tag)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-500 hover:text-gray-700">Cancelar</button>
            <button onClick={handleAddTask} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
              Criar Tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}