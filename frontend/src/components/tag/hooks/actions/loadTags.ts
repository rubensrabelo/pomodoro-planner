import { tagService } from "@/src/services/tag/tagService";
import { Tag } from "@/src/types/tag/tag";

export async function loadTags(
  setTags: (tags: Tag[]) => void,
  setLoading: (loading: boolean) => void,
  setTotal: (total: number) => void,
  page: number = 1,
  limit: number = 5,
) {
  try {
    const { tags, total } = await tagService.getAll(page, limit);
    setTags(tags);
    setTotal(total);
  } catch (error) {
    console.error("Erro ao carregar tags:", error);
  } finally {
    setLoading(false);
  }
}
