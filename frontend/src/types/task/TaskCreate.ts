import { TaskBase } from "./TaskBase";

export interface TaskCreate extends TaskBase {
  tagIds?: number[]; 
}