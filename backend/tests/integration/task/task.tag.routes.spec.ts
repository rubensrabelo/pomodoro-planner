import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/app";
import { cleanDatabase } from "@/../tests/helpers/db";
import { prisma } from "@/infra/prisma/client";

describe("TaskTag Routes Integration", () => {

  beforeEach(async () => {
    await cleanDatabase();
  });

  const validTask = {
    title: "Estudar DDD",
    description: "Revisar Aggregates",
    estimatedPomodoros: 4,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    status: "PENDING",
    priority: "HIGH",
  };

  it("should add tag to task", async () => {
    const taskResponse = await request(app)
      .post("/tasks")
      .send(validTask);

    const tag = await prisma.tag.create({
      data: { name: "Backend" }
    });

    const response = await request(app)
      .post(`/tasks/${taskResponse.body.id}/tags/${tag.id}`);

    expect(response.status).toBe(204);

    const taskWithTags = await prisma.task.findUnique({
      where: { id: taskResponse.body.id },
      include: { tags: true }
    });

    expect(taskWithTags?.tags.length).toBe(1);
    expect(taskWithTags?.tags[0].name).toBe("Backend");
  });

  it("should remove tag from task", async () => {
    const taskResponse = await request(app)
      .post("/tasks")
      .send(validTask);

    const tag = await prisma.tag.create({
      data: { name: "Urgent" }
    });

    await request(app)
      .post(`/tasks/${taskResponse.body.id}/tags/${tag.id}`);

    const response = await request(app)
      .delete(`/tasks/${taskResponse.body.id}/tags/${tag.id}`);

    expect(response.status).toBe(204);

    const taskWithTags = await prisma.task.findUnique({
      where: { id: taskResponse.body.id },
      include: { tags: true }
    });

    expect(taskWithTags?.tags.length).toBe(0);
  });

  it("should return 404 when adding tag to non-existing task", async () => {
    const tag = await prisma.tag.create({
      data: { name: "Backend" }
    });

    const response = await request(app)
      .post(`/tasks/9999/tags/${tag.id}`);

    expect(response.status).toBe(404);
  });

  it("should return 404 when removing tag from non-existing task", async () => {
    const tag = await prisma.tag.create({
      data: { name: "Backend" }
    });

    const response = await request(app)
      .delete(`/tasks/9999/tags/${tag.id}`);

    expect(response.status).toBe(404);
  });

});
