import { prisma } from "@/infra/prisma/client";
import { ITaskTagRepository } from "./ITaskTagRepository";

export class PrismaTaskTagRepository implements ITaskTagRepository {

  async addTag(taskId: number, tagId: number): Promise<void> {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
    });
  }

  async removeTag(taskId: number, tagId: number): Promise<void> {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
    });
  }
}
