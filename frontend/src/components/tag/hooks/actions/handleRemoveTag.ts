import { tagService } from "@/src/services/tag/tagService";
import { Tag } from "@/src/types/tag/tag";

export async function handleRemoveTag(
  id: number,
  setTags: (fn: (prev: Tag[]) => Tag[]) => void
) {
  try {
    await tagService.delete(id);
    setTags(prev => prev.filter(t => t.id !== id));
  } catch (error) {
    alert(`Erro ao deletar tag: ${error}`);
  }
}