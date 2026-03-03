import { tagService } from "@/src/services/tag/tagService";
import { Tag } from "@/src/types/tag/tag";

export async function handleUpdateTag(
  id: number,
  newName: string,
  setTags: (fn: (prev: Tag[]) => Tag[]) => void
) {
  try {
    const updatedTag = await tagService.update(id, newName);
    setTags(prev => prev.map(t => (t.id === id ? updatedTag : t)));
  } catch (error) {
    alert(`Erro ao atualizar tag: ${error}`);
  }
}