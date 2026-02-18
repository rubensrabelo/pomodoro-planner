import { describe, it, expect, vi, beforeEach } from "vitest";
import { PomodoroSessionService } from "@/modules/pomodoro-session/application/services/PomodoroSessionService";
import {
  EntityNotFoundError,
  NotFoundError
} from "@/shared/errors";

describe("PomodoroSessionService", () => {
  let mockRepository: any;
  let service: PomodoroSessionService;

  const fakeSession = {
    id: 1,
    startedAt: new Date(),
    finishedAt: null,
    durationMinutes: 25,
    isCompleted: false,
    taskId: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByTaskId: vi.fn(),
      create: vi.fn(),
      complete: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    service = new PomodoroSessionService(mockRepository);
  });

  it("should return all pomodoro sessions", async () => {
    mockRepository.findAll.mockResolvedValue([fakeSession]);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
    expect(result[0].durationMinutes).toBe(25);
  });

  it("should return pomodoro session by id", async () => {
    mockRepository.findById.mockResolvedValue(fakeSession);

    const result = await service.findById(1);

    expect(result.id).toBe(1);
  });

  it("should throw NotFoundError when session not found", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.findById(1))
      .rejects
      .toThrow(NotFoundError);
  });

  it("should return sessions by task id", async () => {
    mockRepository.findByTaskId.mockResolvedValue([fakeSession]);

    const result = await service.findByTaskId(10);

    expect(result).toHaveLength(1);
    expect(result[0].taskId).toBe(10);
  });

  it("should create pomodoro session successfully", async () => {
    mockRepository.create.mockResolvedValue(fakeSession);

    const result = await service.create({
      startedAt: new Date(),
      durationMinutes: 25,
      taskId: 10,
    });

    expect(result.id).toBe(1);
    expect(result.taskId).toBe(10);
  });

  it("should complete pomodoro session successfully", async () => {
    mockRepository.complete.mockResolvedValue({
      ...fakeSession,
      finishedAt: new Date(),
      isCompleted: true,
    });

    const result = await service.complete({
      id: 1,
      finishedAt: new Date(),
    });

    expect(result.isCompleted).toBe(true);
  });

  it("should throw NotFoundError when completing non-existing session", async () => {
    mockRepository.complete.mockRejectedValue(
      new EntityNotFoundError("PomodoroSession")
    );

    await expect(
      service.complete({
        id: 1,
        finishedAt: new Date(),
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("should update pomodoro session successfully", async () => {
    mockRepository.update.mockResolvedValue(fakeSession);

    const result = await service.update({
      id: 1,
      durationMinutes: 30,
      startedAt: new Date(),
    });

    expect(result.id).toBe(1);
  });

  it("should throw NotFoundError when updating non-existing session", async () => {
    mockRepository.update.mockRejectedValue(
      new EntityNotFoundError("PomodoroSession")
    );

    await expect(
      service.update({
        id: 1,
        durationMinutes: 30,
        startedAt: new Date(),
      })
    ).rejects.toThrow(NotFoundError);
  });

  it("should delete pomodoro session successfully", async () => {
    mockRepository.delete.mockResolvedValue(undefined);

    await expect(service.delete(1))
      .resolves
      .toBeUndefined();
  });

  it("should throw NotFoundError when deleting non-existing session", async () => {
    mockRepository.delete.mockRejectedValue(
      new EntityNotFoundError("PomodoroSession")
    );

    await expect(service.delete(1))
      .rejects
      .toThrow(NotFoundError);
  });
});
