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
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      throw new NotFoundError("Tag not found");
    }

    await this.taskTagRepository.addTag(taskId, tagId);
  }

  async removeTag(taskId: number, tagId: number): Promise<void> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    const tag = await this.tagRepository.findById(tagId);

    if (!tag) {
      throw new NotFoundError("Tag not found");
    }

    await this.taskTagRepository.removeTag(taskId, tagId);
  }
}
