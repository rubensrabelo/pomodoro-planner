import { ITagService } from "./ITagService";
import { ITagRepository } from "../../infra/repositories/ITagRepository";
import { CreateTagDTO } from "../dtos/CreateTagDTO";
import { UpdateTagDTO } from "../dtos/UpdateTagDTO";
import { TagResponseDTO } from "../dtos/TagResponseDTO";
import { Tag } from "../../domain/Tag";
import {
  ConflictError,
  DuplicateEntityError,
  EntityNotFoundError,
  NotFoundError
} from "../../../../shared/errors";
import { PaginationParams } from "@/modules/types/PaginationParams";
import { PaginatedResponse } from "@/modules/types/PaginatedResponse";

export class TagService implements ITagService {
  constructor(
    private readonly tagRepository: ITagRepository
  ) { }

  async findAll(params: PaginationParams): Promise<PaginatedResponse<TagResponseDTO>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [tags, total] = await this.tagRepository.findAll({
      skip,
      take: limit,
    });
    return {
      data: tags.map(tag => this.toResponseDTO(tag)),
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }

  async findById(id: number): Promise<TagResponseDTO> {
    const tag = await this.tagRepository.findById(id);

    if (!tag)
      throw new NotFoundError("Tag not found");

    return this.toResponseDTO(tag);
  }

  async create(data: CreateTagDTO): Promise<TagResponseDTO> {
    try {
      const tag = await this.tagRepository.create(data.name);
      return this.toResponseDTO(tag);
    } catch (err: any) {
      if (err instanceof DuplicateEntityError) {
        throw new ConflictError("Tag name already exists");
      }
      throw err;
    }
  }

  async update(data: UpdateTagDTO): Promise<TagResponseDTO> {
    try {
      const tag = await this.tagRepository.update(data.id, data.name);
      return this.toResponseDTO(tag);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("Tag not found");
      }
      throw err;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.tagRepository.delete(id);
    } catch (err: any) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundError("Tag not found");
      }
      throw err;
    }
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
