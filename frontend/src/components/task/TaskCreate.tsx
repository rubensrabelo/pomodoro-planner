"use client";

import { useState } from "react";
import { TaskResponse } from "@/src/types/task/TaskResponse";
import { TaskCreate as TaskCreateType } from "@/src/types/task/TaskCreate";
import { taskService } from "@/src/services/task/taskService";
import { PriorityEnum } from "@/src/types/task/enums/PriorityEnum";
import { StatusEnum } from "@/src/types/task/enums/StatusEnum";

interface TaskCreateProps {
  onClose: () => void;
  onSave: (task: TaskResponse) => void;
}

export function TaskCreate({ onClose, onSave }: TaskCreateProps) {
  const [loading, setLoading] = useState(false);
  
  const now = new Date().toISOString().slice(0, 16);

  const [form, setForm] = useState({
    title: "",
    description: "",
    estimatedPomodoros: 1,
    priority: "LOW" as PriorityEnum,
    startedAt: now,
    finishedAt: "",
  });

  const handleAddTask = async () => {
    if (!form.title.trim()) return;
    setLoading(true);

    try {
      const payload: TaskCreateType = {
        title: form.title,
        description: form.description,
        estimatedPomodoros: form.estimatedPomodoros,
        priority: form.priority as PriorityEnum,
        status: "PENDING" as StatusEnum,
        startedAt: new Date(form.startedAt).toISOString(),
        finishedAt: new Date(form.finishedAt).toISOString(),
      };

      const savedTask = await taskService.create(payload);
      onSave(savedTask);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar tarefa. Verifique se os dados estão corretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Nova Tarefa</h2>
        
        <div className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-600 mb-1 block">Título</label>
            <input
              autoFocus
              placeholder="Ex: Estudar NestJS"
              className="w-full p-3 border border-gray-200 rounded-xl outline-red-500 text-gray-800 bg-gray-50"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600 mb-1 block">Descrição</label>
            <textarea
              placeholder="Detalhes..."
              className="w-full p-3 border border-gray-200 rounded-xl outline-red-500 text-gray-800 bg-gray-50 h-20 resize-none"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Início</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-gray-50"
                value={form.startedAt}
                onChange={e => setForm({ ...form, startedAt: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 mb-1 block">Previsão Fim</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-800 bg-gray-50"
                value={form.finishedAt}
                onChange={e => setForm({ ...form, finishedAt: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-bold text-gray-600 mb-1 block">Pomodoros</label>
              <input
                type="number" min="1"
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 bg-gray-50"
                value={form.estimatedPomodoros}
                onChange={e => setForm({ ...form, estimatedPomodoros: Number(e.target.value) })}
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-bold text-gray-600 mb-1 block">Prioridade</label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 bg-gray-50"
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value as PriorityEnum })}
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose} 
              className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
            >
              Cancelar
            </button>
            <button 
              onClick={handleAddTask} 
              disabled={loading || !form.title.trim()}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar Tarefa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}