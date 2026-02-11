import { CreateTagDTO } from "../dtos/CreateTagDTO";
import { UpdateTagDTO } from "../dtos/UpdateTagDTO";
import { TagResponseDTO } from "../dtos/TagResponseDTO";

export interface ITagService {
  findAll(): Promise<TagResponseDTO[]>;
  findById(id: number): Promise<TagResponseDTO | null>;
  create(data: CreateTagDTO): Promise<TagResponseDTO>;
  update(data: UpdateTagDTO): Promise<TagResponseDTO>;
  delete(id: number): Promise<void>;
}