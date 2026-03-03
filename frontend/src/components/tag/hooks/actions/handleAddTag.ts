import { tagService } from "@/src/services/tag/tagService";
import { Tag } from "@/src/types/tag/tag";

export async function handleAddTag(
  name: string,
  tags: Tag[],
  setTags: (tags: Tag[]) => void
) {
  if (tags.some(t => t.name.toLowerCase() === name.toLowerCase())) {
    return alert("Essa tag já existe!");
  }
  try {
    const newTag = await tagService.create(name);
    setTags([...tags, newTag]);
  } catch (error) {
    alert(`Erro ao salvar tag: ${error}`);
  }
}