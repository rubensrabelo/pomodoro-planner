import { ITaskTagService } from "./ITaskTagService";
import { ITaskTagRepository } from "../../infra/repositories/ITaskTagRepository";
import { ITaskRepository } from "../../infra/repositories/ITaskRepository";
import { ITagRepository } from "@/modules/tag/infra/repositories/ITagRepository";
import { EntityNotFoundError, NotFoundError } from "@/shared/errors";

export class TaskTagService implements ITaskTagService {

  constructor(
    private readonly taskTagRepository: ITaskTagRepository,
    private readonly taskRepository: ITaskRepository,
    private readonly tagRepository: ITagRepository
  ) { }

  async addTag(taskId: number, tagId: number): Promise<void> {
    try {
      await this.taskRepository.findById(taskId);
      await this.tagRepository.findById(tagId);

      await this.taskTagRepository.addTag(taskId, tagId);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("Task not found");
      }
      throw err;
    }
  }

  async removeTag(taskId: number, tagId: number): Promise<void> {
    try {
      await this.taskRepository.findById(taskId);
      await this.tagRepository.findById(tagId);

      await this.taskTagRepository.removeTag(taskId, tagId);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("Task not found");
      }
      throw err;
    }
  }
}
