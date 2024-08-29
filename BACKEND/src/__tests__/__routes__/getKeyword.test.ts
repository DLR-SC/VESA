import request from "supertest";
import express from "express";
import router from "../../routes/getKeywords";
import { IDatasetID, IKeyword } from "../../types/types";
const app = express();
app.use(express.json());
app.use(router);

const keys1: IDatasetID[] = [
  "Dataset/495997611",
  "Dataset/496057803",
  "Dataset/496059415",
  "STACCollection/modis-10A1-061",
  "STACCollection/modis-10A2-061",
  "STACCollection/modis-10a1-061",
];

describe("POST /keywords", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).post("/").send({ key: keys1 });
    expect(response.status).toBe(200);
  });

  it("should return the keywords", async () => {
    const response = await request(app).post("/").send({ key: keys1 });
    const keywords: IKeyword[] = response.body.result;
    expect(keywords).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyword: expect.any(String),
          count: expect.any(Number),
          dataset_id: expect.arrayContaining([expect.any(String)]),
        }),
      ])
    );
  });
});

describe("GET/all keywords", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/all");
    expect(response.status).toBe(200);
  });
  it("should return all the keywords from the database", async () => {
    const response = await request(app).get("/all");
    const keywords: IKeyword[] = response.body.result;
    expect(keywords).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyword: expect.any(String),
          count: expect.any(Number),
          dataset_id: expect.arrayContaining([expect.any(String)]),
        }),
      ])
    );
  });
});
