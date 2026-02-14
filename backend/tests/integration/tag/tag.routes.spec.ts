import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/app";
import { cleanDatabase } from "@/../tests/helpers/db";

describe("Tag Routes Integration", () => {

  beforeEach(async () => {
    await cleanDatabase();
  });

  it("should create a tag", async () => {
    const response = await request(app)
      .post("/tags")
      .send({ name: "backend" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("backend");
  });

  it("should return 400 if name is missing", async () => {
    const response = await request(app)
      .post("/tags")
      .send({});

    expect(response.status).toBe(400);
  });

  it("should return 409 if tag already exists", async () => {
    await request(app)
      .post("/tags")
      .send({ name: "backend" });

    const response = await request(app)
      .post("/tags")
      .send({ name: "backend" });

    expect(response.status).toBe(409);
  });

  it("should list tags", async () => {
    await request(app)
      .post("/tags")
      .send({ name: "frontend" });

    const response = await request(app).get("/tags");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should return a tag by id", async () => {
    const created = await request(app)
      .post("/tags")
      .send({ name: "devops" });

    const response = await request(app)
      .get(`/tags/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("devops");
  });

  it("should return 404 if tag not found", async () => {
    const response = await request(app)
      .get("/tags/9999");

    expect(response.status).toBe(404);
  });

  it("should update a tag", async () => {
    const created = await request(app)
      .post("/tags")
      .send({ name: "mobile" });

    const response = await request(app)
      .put(`/tags/${created.body.id}`)
      .send({ name: "mobile-updated" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("mobile-updated");
  });

  it("should delete a tag", async () => {
    const created = await request(app)
      .post("/tags")
      .send({ name: "temp" });

    const response = await request(app)
      .delete(`/tags/${created.body.id}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting non-existing tag", async () => {
    const response = await request(app)
      .delete("/tags/9999");

    expect(response.status).toBe(404);
  });

});
