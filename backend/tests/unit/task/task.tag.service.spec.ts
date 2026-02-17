import { describe, it, expect, vi, beforeEach } from "vitest";
import { TaskTagService } from "@/modules/task/application/services/TaskTagService";
import { NotFoundError } from "@/shared/errors";

describe("TaskTagService", () => {
  let mockTaskTagRepository: any;
  let mockTaskRepository: any;
  let mockTagRepository: any;
  let service: TaskTagService;

  beforeEach(() => {
    mockTaskTagRepository = {
      addTag: vi.fn(),
      removeTag: vi.fn(),
    };

    mockTaskRepository = {
      findById: vi.fn(),
    };

    mockTagRepository = {
      findById: vi.fn(),
    };

    service = new TaskTagService(
      mockTaskTagRepository,
      mockTaskRepository,
      mockTagRepository
    );
  });

  it("should add tag to task successfully", async () => {
    mockTaskRepository.findById.mockResolvedValue({ id: 1 });
    mockTagRepository.findById.mockResolvedValue({ id: 2 });
    mockTaskTagRepository.addTag.mockResolvedValue(undefined);

    await service.addTag(1, 2);

    expect(mockTaskRepository.findById).toHaveBeenCalledWith(1);
    expect(mockTagRepository.findById).toHaveBeenCalledWith(2);
    expect(mockTaskTagRepository.addTag).toHaveBeenCalledWith(1, 2);
  });

  it("should remove tag from task successfully", async () => {
    mockTaskRepository.findById.mockResolvedValue({ id: 1 });
    mockTagRepository.findById.mockResolvedValue({ id: 2 });
    mockTaskTagRepository.removeTag.mockResolvedValue(undefined);

    await service.removeTag(1, 2);

    expect(mockTaskRepository.findById).toHaveBeenCalledWith(1);
    expect(mockTagRepository.findById).toHaveBeenCalledWith(2);
    expect(mockTaskTagRepository.removeTag).toHaveBeenCalledWith(1, 2);
  });

  it("should throw NotFoundError when task does not exist", async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    await expect(service.addTag(1, 2))
      .rejects
      .toThrow(NotFoundError);

    expect(mockTaskTagRepository.addTag).not.toHaveBeenCalled();
  });

  it("should throw NotFoundError when tag does not exist", async () => {
    mockTaskRepository.findById.mockResolvedValue({ id: 1 });
    mockTagRepository.findById.mockResolvedValue(null);

    await expect(service.addTag(1, 2))
      .rejects
      .toThrow(NotFoundError);

    expect(mockTaskTagRepository.addTag).not.toHaveBeenCalled();
  });
});
