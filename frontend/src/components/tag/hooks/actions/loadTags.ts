import { tagService } from "@/src/services/tag/tagService";
import { Tag } from "@/src/types/tag/tag";

export async function loadTags(
  setTags: (tags: Tag[]) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    const data = await tagService.getAll();
    setTags(data);
  } catch (error) {
    console.error("Erro ao carregar tags:", error);
  } finally {
    setLoading(false);
  }
}