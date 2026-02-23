import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskService } from "@/modules/task/application/services/TaskService";
import {
  EntityNotFoundError,
  NotFoundError
} from "@/shared/errors";

describe("TaskService", () => {
  let mockRepository: any;
  let service: TaskService;

  const fakeTask = {
    id: 1,
    title: "Estudar DDD",
    description: "Revisar Aggregates",
    estimatedPomodoros: 4,
    startedAt: null,
    finishedAt: null,
    status: "PENDING",
    priority: "HIGH",
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

    service = new TaskService(mockRepository);
  });

  it("should return all tasks", async () => {
    mockRepository.findAll.mockResolvedValue([
      [fakeTask],
      1
    ]);

    const result = await service.findAll({ page: 1, limit: 10 });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].title).toBe("Estudar DDD");

    expect(result.meta.total).toBe(1);
    expect(result.meta.page).toBe(1);
    expect(result.meta.limit).toBe(10);
    expect(result.meta.lastPage).toBe(1);
  });

  it("should return task by id", async () => {
    mockRepository.findById.mockResolvedValue(fakeTask);

    const result = await service.findById(1);

    expect(result.id).toBe(1);
  });

  it("should throw NotFoundError when task not found", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.findById(1))
      .rejects
      .toThrow(NotFoundError);
  });

  it("should create task successfully", async () => {
    mockRepository.create.mockResolvedValue(fakeTask);

    const result = await service.create({
      title: "Estudar Clean Architecture",
      description: "Revisar camadas e inversão de dependência",
      estimatedPomodoros: 3,
      startedAt: new Date(),
      finishedAt: null,
      status: "PENDING",
      priority: "HIGH",
    });

    expect(result.title).toBe("Estudar DDD");
  });

  it("should update task successfully", async () => {
    mockRepository.update.mockResolvedValue(fakeTask);

    const result = await service.update(1, {
      title: "Estudar Clean Architecture",
    });

    expect(result.id).toBe(1);
  });

  it("should throw NotFoundError when updating non-existing task", async () => {
    mockRepository.update.mockRejectedValue(
      new EntityNotFoundError("Task")
    );

    await expect(service.update(1, { title: "Teste" }))
      .rejects
      .toThrow(NotFoundError);
  });

  it("should delete task successfully", async () => {
    mockRepository.delete.mockResolvedValue(undefined);

    await expect(service.delete(1)).resolves.toBeUndefined();
  });

  it("should throw NotFoundError when deleting non-existing task", async () => {
    mockRepository.delete.mockRejectedValue(
      new EntityNotFoundError("Task")
    );

    await expect(service.delete(1))
      .rejects
      .toThrow(NotFoundError);
  });
});
