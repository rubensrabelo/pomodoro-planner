import { Request, Response } from "express";
import { ITaskService } from "../../application/services/ITaskService";

export class TaskController {
  constructor(
    private readonly taskService: ITaskService
  ) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const tasks = await this.taskService.findAll();
    return res.json(tasks);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await this.taskService.findById(id);
    return res.json(task);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const task = await this.taskService.create(req.body);
    return res.status(201).json(task);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const task = await this.taskService.update(id, req.body);
    return res.json(task);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    await this.taskService.delete(id);
    return res.status(204).send();
  }
}
