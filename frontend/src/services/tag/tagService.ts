import { getApiUrl } from "@/src/utils/getApiUrl";
import { Tag } from "@/src/types/tag/tag";

export const tagService = {
  async getAll(page: number = 1, limit: number = 5): Promise<{ tags: Tag[], total: number }> {
    const response = await fetch(getApiUrl(`/tags?page=${page}&limit=${limit}`));
    if (!response.ok) throw new Error("Erro ao buscar tags");

    const result = await response.json();

    return { 
      tags: result.data || [], 
      total: result.meta?.total || 0 
    };
  },

  async create(name: string): Promise<Tag> {
    const response = await fetch(getApiUrl("/tags"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Erro ao criar tag");
    
    return response.json();
  },

  async update(id: number, name: string): Promise<Tag> {
    const response = await fetch(getApiUrl(`/tags/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar tag");
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(getApiUrl(`/tags/${id}`), {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao excluir tag");
  }
};