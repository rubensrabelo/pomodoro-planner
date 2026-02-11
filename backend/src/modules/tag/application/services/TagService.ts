import { ITagService } from "./ITagService";
import { ITagRepository } from "../../infra/repositories/ITagRepository";
import { CreateTagDTO } from "../dtos/CreateTagDTO";
import { UpdateTagDTO } from "../dtos/UpdateTagDTO";
import { TagResponseDTO } from "../dtos/TagResponseDTO";
import { Tag } from "../../domain/Tag";

export class TagService implements ITagService {
  constructor(
    private readonly tagRepository: ITagRepository
  ) {}

  async findAll(): Promise<TagResponseDTO[]> {
    const tags = await this.tagRepository.findAll();
    return tags.map(this.toResponseDTO);
  }

  async findById(id: number): Promise<TagResponseDTO | null> {
    const tag = await this.tagRepository.findById(id);
    return tag ? this.toResponseDTO(tag) : null;
  }

  async create(data: CreateTagDTO): Promise<TagResponseDTO> {
    const tag = await this.tagRepository.create(data.name);
    return this.toResponseDTO(tag);
  }

  async update(data: UpdateTagDTO): Promise<TagResponseDTO> {
    const tag = await this.tagRepository.update(data.id, data.name);
    return this.toResponseDTO(tag);
  }

  async delete(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }

  private toResponseDTO(tag: Tag): TagResponseDTO {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }
}
