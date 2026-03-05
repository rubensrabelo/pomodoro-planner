import { Tag } from "../tag/tag";
import { TaskBase } from "./TaskBase";

export interface TaskResponse extends TaskBase {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  tags: Tag[];
}
