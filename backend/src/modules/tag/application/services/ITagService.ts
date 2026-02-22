import { CreateTagDTO } from "../dtos/CreateTagDTO";
import { UpdateTagDTO } from "../dtos/UpdateTagDTO";
import { TagResponseDTO } from "../dtos/TagResponseDTO";
import { PaginationParams } from "@/modules/types/PaginationParams";
import { PaginatedResponse } from "@/modules/types/PaginatedResponse";

export interface ITagService {
  findAll(params: PaginationParams): Promise<PaginatedResponse<TagResponseDTO>>;
  findById(id: number): Promise<TagResponseDTO | null>;
  create(data: CreateTagDTO): Promise<TagResponseDTO>;
  update(data: UpdateTagDTO): Promise<TagResponseDTO>;
  delete(id: number): Promise<void>;
}