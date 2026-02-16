import { Request, Response } from "express";
import { ITaskTagService } from "../../application/services/ITaskTagService";

export class TaskTagController {

  constructor(
    private readonly taskTagService: ITaskTagService
  ) {}

  async addTag(req: Request, res: Response): Promise<Response> {
    const taskId = Number(req.params.taskId);
    const tagId = Number(req.params.tagId);

    await this.taskTagService.addTag(taskId, tagId);

    return res.status(204).send();
  }

  async removeTag(req: Request, res: Response): Promise<Response> {
    const taskId = Number(req.params.taskId);
    const tagId = Number(req.params.tagId);

    await this.taskTagService.removeTag(taskId, tagId);

    return res.status(204).send();
  }
}
