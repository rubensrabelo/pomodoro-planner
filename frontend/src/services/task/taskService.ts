import { getApiUrl } from "@/src/utils/getApiUrl";
import { TaskResponse } from "@/src/types/task/TaskResponse";
import { TaskCreate } from "@/src/types/task/TaskCreate";
import { TaskUpdate } from "@/src/types/task/TaskUpdate";

export const taskService = {
  async getAll(page: number = 1, limit: number = 5): Promise<{ tasks: TaskResponse[], total: number }> {
    const response = await fetch(getApiUrl(`/tasks?page=${page}&limit=${limit}`));
    if (!response.ok) throw new Error("Erro ao buscar as tarefas");

    const result = await response.json();
    
    return { 
      tasks: result.data || [], 
      total: result.meta?.total || 0 
    };
  },

  async getById(id: number): Promise<TaskResponse> {
    const response = await fetch(getApiUrl(`/tasks/${id}`));
    if (!response.ok) throw new Error("Erro ao buscar a tarefa");

    return await response.json();
  },

  async create(data: TaskCreate): Promise<TaskResponse> {
    const response = await fetch(getApiUrl("/tasks"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar a tarefa");
    
    return response.json();
  },

  async update(id: number, data: TaskUpdate): Promise<TaskResponse> {
    const response = await fetch(getApiUrl(`/tasks/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao atualizar a tarefa");
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(getApiUrl(`/tasks/${id}`), {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir a tarefa");
  }
};