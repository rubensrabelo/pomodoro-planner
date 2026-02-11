import { Tag } from "../../domain/Tag";

export interface ITagRepository {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag | null>;
  create(name: string): Promise<Tag>;
  update(id: number, name: string): Promise<Tag>;
  delete(id: number): Promise<void>;
}
