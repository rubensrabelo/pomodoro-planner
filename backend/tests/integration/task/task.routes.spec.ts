import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/app";
import { cleanDatabase } from "@/../tests/helpers/db";

describe("Task Routes Integration", () => {

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

  it("should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send(validTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Estudar DDD");
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({});

    expect(response.status).toBe(400);
  });

  it("should list tasks", async () => {
    await request(app)
      .post("/tasks")
      .send(validTask);

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].title).toBe("Estudar DDD");

    expect(response.body.meta.total).toBe(1);
    expect(response.body.meta.page).toBe(1);
    expect(response.body.meta.limit).toBeDefined();
    expect(response.body.meta.lastPage).toBe(1);
  });

  it("should return a task by id", async () => {
    const created = await request(app)
      .post("/tasks")
      .send(validTask);

    const response = await request(app)
      .get(`/tasks/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Estudar DDD");
  });

  it("should return 404 if task not found", async () => {
    const response = await request(app)
      .get("/tasks/9999");

    expect(response.status).toBe(404);
  });

  it("should update a task", async () => {
    const created = await request(app)
      .post("/tasks")
      .send(validTask);

    const response = await request(app)
      .put(`/tasks/${created.body.id}`)
      .send({ title: "Estudar Clean Architecture" });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Estudar Clean Architecture");
  });

  it("should delete a task", async () => {
    const created = await request(app)
      .post("/tasks")
      .send(validTask);

    const response = await request(app)
      .delete(`/tasks/${created.body.id}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting non-existing task", async () => {
    const response = await request(app)
      .delete("/tasks/9999");

    expect(response.status).toBe(404);
  });

});
