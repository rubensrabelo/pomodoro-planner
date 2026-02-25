import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/app";
import { cleanDatabase } from "@/../tests/helpers/db";
import { ROUTES } from "tests/constants/routes";

describe("Tag Routes Integration", () => {

  beforeEach(async () => {
    await cleanDatabase();
  });

  it("should create a tag", async () => {
    const response = await request(app)
      .post(ROUTES.tags)
      .send({ name: "backend" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("backend");
  });

  it("should return 400 if name is missing", async () => {
    const response = await request(app)
      .post(ROUTES.tags)
      .send({});

    expect(response.status).toBe(400);
  });

  it("should return 409 if tag already exists", async () => {
    await request(app)
      .post(ROUTES.tags)
      .send({ name: "backend" });

    const response = await request(app)
      .post(ROUTES.tags)
      .send({ name: "backend" });

    expect(response.status).toBe(409);
  });

  it("should list tags", async () => {
    await request(app)
      .post(ROUTES.tags)
      .send({ name: "frontend" });

    const response = await request(app).get(ROUTES.tags);

    expect(response.status).toBe(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].name).toBe("frontend");

    expect(response.body.meta.total).toBe(1);
    expect(response.body.meta.page).toBe(1);
    expect(response.body.meta.limit).toBeDefined();
    expect(response.body.meta.lastPage).toBe(1);
  });

  it("should return a tag by id", async () => {
    const created = await request(app)
      .post(ROUTES.tags)
      .send({ name: "devops" });

    const response = await request(app)
      .get(`${ROUTES.tags}/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("devops");
  });

  it("should return 404 if tag not found", async () => {
    const response = await request(app)
      .get(`${ROUTES.tags}/9999`);

    expect(response.status).toBe(404);
  });

  it("should update a tag", async () => {
    const created = await request(app)
      .post(ROUTES.tags)
      .send({ name: "mobile" });

    const response = await request(app)
      .put(`${ROUTES.tags}/${created.body.id}`)
      .send({ name: "mobile-updated" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("mobile-updated");
  });

  it("should delete a tag", async () => {
    const created = await request(app)
      .post(ROUTES.tags)
      .send({ name: "temp" });

    const response = await request(app)
      .delete(`${ROUTES.tags}/${created.body.id}`);

    expect(response.status).toBe(204);
  });

  it("should return 404 when deleting non-existing tag", async () => {
    const response = await request(app)
      .delete(`${ROUTES.tags}/9999`);

    expect(response.status).toBe(404);
  });

});
