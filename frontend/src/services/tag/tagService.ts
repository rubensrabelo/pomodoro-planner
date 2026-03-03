import { getApiUrl } from "@/src/utils/getApiUrl";
import { Tag } from "@/src/types/tag/tag";

export const tagService = {
  async getAll(): Promise<Tag[]> {
    const response = await fetch(getApiUrl("/tags"));
    if (!response.ok) throw new Error("Erro ao buscar tags");

    const data = await response.json();

    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0]; 
    }
    if (data && typeof data === 'object' && Array.isArray(data.tags)) {
      return data.tags;
    }
    if (Array.isArray(data)) {
      return data;
    }

    return [];
  },

  async create(name: string): Promise<Tag> {
    const response = await fetch(getApiUrl("/tags"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Erro ao criar tag");
    return response.json() || [];
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