import request from "supertest";
import express, { Express } from "express";
import router from "../../routes/persist"; // Assuming this file is saved as router.ts

describe("Router Tests", () => {
  const app: Express = express();
  app.use(express.json());
  app.use(router);

  it("POST / should persist keys", async () => {
    const key = { id: "Dataset/123" };
    const response = await request(app).post("/").send({ key });

    expect(response.status).toBe(200);
    expect(response.body.keys).toHaveLength(1);
    expect(response.body.keys[0]).toEqual(key);
  });

  it("GET / should return persisted keys", async () => {
    await request(app)
      .post("/")
      .send({ key: { id: "Dataset/123" } });

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.keys).toEqual([{ id: "Dataset/123" }]);
  });

  it("GET / should return empty array if no keys are persisted", async () => {
    await request(app).post("/").send();
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.keys).toEqual([null]);
  });
});
