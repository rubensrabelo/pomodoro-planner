import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/app";
import { cleanDatabase } from "@/../tests/helpers/db";
import { ROUTES } from "tests/constants/routes";

describe("Pomodoro Routes Integration", () => {

  let taskId: number;

  beforeEach(async () => {
    await cleanDatabase();

    const taskResponse = await request(app)
      .post(ROUTES.tasks)
      .send({
        title: "Task Test",
        description: "Desc",
        estimatedPomodoros: 3,
        startedAt: new Date().toISOString(),
        finishedAt: null,
        status: "PENDING",
        priority: "MEDIUM",
      });

    taskId = taskResponse.body.id;
  });

  const buildPomodoro = () => ({
    startedAt: new Date().toISOString(),
    durationMinutes: 25,
    taskId,
  });

  it("should create a pomodoro session", async () => {
    const response = await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.durationMinutes).toBe(25);
    expect(response.body.isCompleted).toBe(false);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post(ROUTES.pomodoros)
      .send({});

    expect(response.status).toBe(400);
  });

  it("should list pomodoro sessions", async () => {
    await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    const response = await request(app)
      .get(ROUTES.pomodoros);

    expect(response.status).toBe(200);
    
    
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].durationMinutes).toBe(25);

    expect(response.body.meta.total).toBe(1);
    expect(response.body.meta.page).toBe(1);
    expect(response.body.meta.limit).toBeDefined();
    expect(response.body.meta.lastPage).toBe(1);
  });

  it("should return a pomodoro session by id", async () => {
    const created = await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    const response = await request(app)
      .get(`${ROUTES.pomodoros}/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(created.body.id);
  });

  it("should return 404 if pomodoro not found", async () => {
    const response = await request(app)
      .get(`${ROUTES.pomodoros}/9999`);

    expect(response.status).toBe(404);
  });

  it("should list pomodoros by task id", async () => {
    await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    const response = await request(app)
      .get(`${ROUTES.pomodoros}/task/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].taskId).toBe(taskId);
  });

  it("should update a pomodoro session", async () => {
    const created = await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    const response = await request(app)
      .put(`${ROUTES.pomodoros}/${created.body.id}`)
      .send({ durationMinutes: 30 });

    expect(response.status).toBe(200);
    expect(response.body.durationMinutes).toBe(30);
  });

  it("should complete a pomodoro session", async () => {
    const created = await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    const response = await request(app)
      .patch(`${ROUTES.pomodoros}/${created.body.id}/complete`)
      .send({ finishedAt: new Date().toISOString() });

    expect(response.status).toBe(200);
    expect(response.body.isCompleted).toBe(true);
    expect(response.body.finishedAt).not.toBeNull();
  });

  it("should delete a pomodoro session", async () => {
    const created = await request(app)
      .post(ROUTES.pomodoros)
      .send(buildPomodoro());

    const response = await request(app)
      .delete(`${ROUTES.pomodoros}/${created.body.id}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting non-existing pomodoro", async () => {
    const response = await request(app)
      .delete(`${ROUTES.pomodoros}/9999`);

    expect(response.status).toBe(404);
  });

});
