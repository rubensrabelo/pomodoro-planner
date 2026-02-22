import { Tag } from "../../domain/Tag";
import { RepositoryPagination } from "../../../types/RepositoryPagination";

export interface ITagRepository {
  findAll(params: RepositoryPagination): Promise<[Tag[], number]>;
  findById(id: number): Promise<Tag | null>;
  create(name: string): Promise<Tag>;
  update(id: number, name: string): Promise<Tag>;
  delete(id: number): Promise<void>;
}
