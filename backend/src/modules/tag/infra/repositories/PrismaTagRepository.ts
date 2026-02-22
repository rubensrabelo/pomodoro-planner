import { prisma } from "../../../../infra/prisma/client";
import { DuplicateEntityError, EntityNotFoundError } from "../../../../shared/errors";
import { Tag } from "../../domain/Tag";
import { ITagRepository } from "./ITagRepository";
import { RepositoryPagination } from "../../../types/RepositoryPagination";

export class PrismaTagRepository implements ITagRepository {
  async findAll(params: RepositoryPagination): Promise<[Tag[], number]> {
    const [tags, total] = await Promise.all([
      prisma.tag.findMany({
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.tag.count(),
    ]);

    return [
      tags.map(
        t => new Tag(t.id, t.name, t.createdAt, t.updatedAt)
      ),
      total,
    ];
  }

  async findById(id: number): Promise<Tag | null> {
    const tag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!tag) return null;

    return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
  }

  async create(name: string): Promise<Tag> {
    try {
      const tag = await prisma.tag.create({
        data: { name }
      });

      return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
    } catch (err: any) {
      if (err.code === "P2002") {
        throw new DuplicateEntityError("Tag", "name");
      }
      throw err;
    }
  }

  async update(id: number, name: string): Promise<Tag> {
    try {
      const tag = await prisma.tag.update({
        where: { id },
        data: { name }
      });

      return new Tag(tag.id, tag.name, tag.createdAt, tag.updatedAt);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("Tag");
      }
      throw err;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.tag.delete({
        where: { id }
      });
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new EntityNotFoundError("Tag");
      }
      throw err;
    }
  }
}