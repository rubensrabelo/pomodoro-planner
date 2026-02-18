import { Request, Response } from "express";
import { IPomodoroSessionService } from "../../application/services/IPomodoroSessionService";

export class PomodoroSessionController {
  constructor(
    private readonly pomodoroService: IPomodoroSessionService
  ) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const sessions = await this.pomodoroService.findAll();
    return res.json(sessions);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const session = await this.pomodoroService.findById(id);
    return res.json(session);
  }

  async findByTaskId(req: Request, res: Response): Promise<Response> {
    const taskId = Number(req.params.taskId);
    const sessions = await this.pomodoroService.findByTaskId(taskId);
    return res.json(sessions);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const session = await this.pomodoroService.create(req.body);
    return res.status(201).json(session);
  }

  async complete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const session = await this.pomodoroService.complete({
      id,
      finishedAt: req.body.finishedAt,
    });

    return res.json(session);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const session = await this.pomodoroService.update({
      id,
      ...req.body,
    });

    return res.json(session);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    await this.pomodoroService.delete(id);
    return res.status(204).send();
  }
}
