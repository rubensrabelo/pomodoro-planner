import { prisma } from "../../../../infra/prisma/client";
import { Tag } from "../../domain/Tag";
import { ITagRepository } from "./ITagRepository";

export class PrismaTagRepository implements ITagRepository {
  async findAll(): Promise<Tag[]> {
    const tags = await prisma.tag.findMany();

    return tags.map(
      t => new Tag(t.id, t.name, t.createdAt, t.updatedAt)
    );
  }

  async findById(id: number): Promise<Tag | null> {
    const tag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!tag) return null;

    return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
  }

  async create(name: string): Promise<Tag> {
    const tag = await prisma.tag.create({
      data: { name }
    });

    return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
  }

  async update(id: number, name: string): Promise<Tag> {
    const tag = await prisma.tag.update({
      where: { id },
      data: { name }
    });

    return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
  }

  async delete(id: number): Promise<void> {
    await prisma.tag.delete({
      where: { id }
    });
  }
}
