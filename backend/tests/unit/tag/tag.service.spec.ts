import { describe, it, expect, vi, beforeEach } from "vitest";
import { TagService } from "@/modules/tag/application/services/TagService";
import {
  ConflictError,
  DuplicateEntityError,
  EntityNotFoundError,
  NotFoundError
} from "@/shared/errors";

describe("TagService", () => {
  let mockRepository: any;
  let service: TagService;

  const fakeTag = {
    id: 1,
    name: "backend",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    service = new TagService(mockRepository);
  });

  it("should return all tags", async () => {
    mockRepository.findAll.mockResolvedValue([
      [fakeTag],
      1
    ]);

    const result = await service.findAll({ page: 1, limit: 10 });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe("backend");

    expect(result.meta.total).toBe(1);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
    expect(result.meta.lastPage).toBe(1);
  });

  it("should return tag by id", async () => {
    mockRepository.findById.mockResolvedValue(fakeTag);

    const result = await service.findById(1);

    expect(result.id).toBe(1);
  });

  it("should throw NotFoundError when tag not found", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.findById(1))
      .rejects
      .toThrow(NotFoundError);
  });

  it("should create tag successfully", async () => {
    mockRepository.create.mockResolvedValue(fakeTag);

    const result = await service.create({ name: "backend" });

    expect(result.name).toBe("backend");
  });

  it("should throw ConflictError when duplicate name", async () => {
    mockRepository.create.mockRejectedValue(
      new DuplicateEntityError("Tag")
    );

    await expect(service.create({ name: "backend" }))
      .rejects
      .toThrow(ConflictError);
  });

  it("should update tag successfully", async () => {
    mockRepository.update.mockResolvedValue(fakeTag);

    const result = await service.update({ id: 1, name: "backend" });

    expect(result.id).toBe(1);
  });

  it("should throw NotFoundError when updating non-existing tag", async () => {
    mockRepository.update.mockRejectedValue(
      new EntityNotFoundError("Tag")
    );

    await expect(service.update({ id: 1, name: "backend" }))
      .rejects
      .toThrow(NotFoundError);
  });

  it("should delete tag successfully", async () => {
    mockRepository.delete.mockResolvedValue(undefined);

    await expect(service.delete(1)).resolves.toBeUndefined();
  });

  it("should throw NotFoundError when deleting non-existing tag", async () => {
    mockRepository.delete.mockRejectedValue(
      new EntityNotFoundError("Tag")
    );

    await expect(service.delete(1))
      .rejects
      .toThrow(NotFoundError);
  });
});
