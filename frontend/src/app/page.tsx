"use client";

import { useState } from "react";
import { Task } from "../types/task/Task";
import { TagList } from "../components/tag/TagList";


export default function PomoPlannerHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(["Trabalho", "Estudo", "Saúde"]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    estimated: 1,
    priority: "Média" as "Baixa" | "Média" | "Alta",
    selectedTags: [] as string[]
  });

  const [newTagName, setNewTagName] = useState("");

  function addTask() {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      estimatedPomodoros: newTask.estimated,
      completedPomodoros: 0,
      tags: newTask.selectedTags,
      priority: newTask.priority
    };
    setTasks([...tasks, task]);
    setIsTaskModalOpen(false);
    setNewTask({ title: "", estimated: 1, priority: "Média", selectedTags: [] });
  };

  function addPomodoro(taskId: number) {
    setTasks(tasks.map(t =>
      t.id === taskId && t.completedPomodoros < t.estimatedPomodoros
        ? { ...t, completedPomodoros: t.completedPomodoros + 1 }
        : t
    ));
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-red-100">
        <div>
          <h1 className="text-3xl font-extrabold text-red-600">PomoPlanner</h1>
          <p className="text-gray-500">Transforme tarefas em foco.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsTagModalOpen(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Tags
          </button>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
          >
            + Nova Tarefa
          </button>
        </div>
      </header>

      <section className="grid gap-4">
        {tasks.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-400">Nenhuma tarefa para hoje. Que tal planejar uma?</p>
          </div>
        )}

        {tasks.map(task => (
          <div key={task.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${task.priority === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                  {task.priority}
                </span>
                <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
              </div>
              <div className="flex gap-2">
                {task.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full uppercase tracking-wider">
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
                onClick={() => addPomodoro(task.id)}
                className="p-3 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition"
                title="Concluir Pomodoro"
              >
                ✅
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* MODAL: CRIAR TAREFA */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Nova Tarefa</h2>
            <div className="space-y-4">
              <input
                placeholder="O que você vai fazer?"
                className="w-full p-3 border rounded-xl outline-red-500"
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-bold text-gray-600">Pomodoros Estimados</label>
                  <input
                    type="number" min="1"
                    className="w-full p-3 border rounded-xl mt-1"
                    value={newTask.estimated}
                    onChange={e => setNewTask({ ...newTask, estimated: Number(e.target.value) })}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-bold text-gray-600">Prioridade</label>
                  <select
                    className="w-full p-3 border rounded-xl mt-1"
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
                      onClick={() => {
                        const tags = newTask.selectedTags.includes(tag)
                          ? newTask.selectedTags.filter(t => t !== tag)
                          : [...newTask.selectedTags, tag];
                        setNewTask({ ...newTask, selectedTags: tags });
                      }}
                      className={`px-3 py-1 rounded-full text-xs transition ${newTask.selectedTags.includes(tag)
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
                <button onClick={() => setIsTaskModalOpen(false)} className="flex-1 py-3 font-bold text-gray-500">Cancelar</button>
                <button onClick={addTask} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Criar Tarefa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTagModalOpen && (
        <TagList
          availableTags={availableTags}
          setAvailableTags={setAvailableTags}
          setIsTagModalOpen={setIsTagModalOpen}
        />
      )}
    </main>
  );
}