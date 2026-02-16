export interface ITaskTagRepository {
  addTag(taskId: number, tagId: number): Promise<void>;
  removeTag(taskId: number, tagId: number): Promise<void>;
}
