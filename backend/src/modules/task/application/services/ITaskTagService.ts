export interface ITaskTagService {
  addTag(taskId: number, tagId: number): Promise<void>;
  removeTag(taskId: number, tagId: number): Promise<void>;
}
