import { Request, Response } from "express";
import { ITagService } from "../../application/services/ITagService";

export class TagController {
  constructor(
    private readonly tagService: ITagService
  ) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const tags = await this.tagService.findAll();
    return res.json(tags);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const tag = await this.tagService.findById(id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res.json(tag);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const tag = await this.tagService.create({ name });

    return res.status(201).json(tag);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { name } = req.body;

    const tag = await this.tagService.update({ id, name });

    return res.json(tag);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    await this.tagService.delete(id);

    return res.status(204).send();
  }
}
