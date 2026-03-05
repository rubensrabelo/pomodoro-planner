"use client";

import { useState, useEffect, useCallback } from "react";
import { TaskResponse } from "../types/task/TaskResponse";
import { TaskList } from "../components/task/TaskList";
import { TagList } from "../components/tag/TagList";
import { TaskCreate } from "../components/task/TaskCreate";
import { TaskHeader } from "../components/task/TaskHeader";
import { taskService } from "../services/task/taskService";

export default function PomoPlannerHome() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const LIMIT = 5; 

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { tasks, total } = await taskService.getAll(currentPage, LIMIT);
      setTasks(tasks);
      setTotalTasks(total);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskSaved = (newTask: TaskResponse) => {
    if (currentPage === 1) {
      setTasks((prev) => [newTask, ...prev.slice(0, LIMIT - 1)]);
    } else {
      setCurrentPage(1);
    }
    setTotalTasks(prev => prev + 1);
    setIsTaskModalOpen(false);
  };

  const addPomodoro = async (taskId: number) => {
    try {
      const updatedTask = await taskService.update(taskId, {
        status: "COMPLETED"
      });
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const totalPages = Math.ceil(totalTasks / LIMIT);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-gray-50/30">
      
      <TaskHeader 
        onOpenTags={() => setIsTagModalOpen(true)} 
        onOpenNewTask={() => setIsTaskModalOpen(true)} 
      />

      {loading ? (
        <div className="flex justify-center py-20 text-red-600">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
        </div>
      ) : (
        <>
          <TaskList 
            tasks={tasks} 
            onAddPomodoro={addPomodoro} 
          />

          {totalTasks > 0 && (
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6">
              <span className="text-sm text-gray-500 font-medium">
                Total: <b>{totalTasks}</b> tarefas
              </span>
              
              <div className="flex items-center gap-4">
                <button
                  disabled={currentPage === 1 || loading}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30 transition"
                >
                  ← Anterior
                </button>
                
                <span className="text-sm font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-md">
                  {currentPage} / {totalPages || 1}
                </span>

                <button
                  disabled={currentPage >= totalPages || loading}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30 transition"
                >
                  Próximo →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {isTaskModalOpen && (
        <TaskCreate 
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleTaskSaved}
        />
      )}

      {isTagModalOpen && (
        <TagList
          setIsTagModalOpen={setIsTagModalOpen}
        />
      )}
    </main>
  );
}