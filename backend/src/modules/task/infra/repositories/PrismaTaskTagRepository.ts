import { prisma } from "@/infra/prisma/client";
import { ITaskTagRepository } from "./ITaskTagRepository";
import { EntityNotFoundError } from "@/shared/errors";

export class PrismaTaskTagRepository implements ITaskTagRepository {

  async addTag(taskId: number, tagId: number): Promise<void> {
    try {
      await prisma.task.update({
        where: { id: taskId },
        data: {
          tags: {
            connect: { id: tagId },
          },
        },
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("Task");
      }
      throw err;
    }
  }

  async removeTag(taskId: number, tagId: number): Promise<void> {
    try {
      await prisma.task.update({
        where: { id: taskId },
        data: {
          tags: {
            disconnect: { id: tagId },
          },
        },
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("Task");
      }
      throw err;
    }
  }
}
