import request from "supertest";
import express from "express";
import router from "../../routes/getMapData";
import { IDatasetID } from "../../types/types";

const app = express();
app.use(express.json());
app.use(router);

describe("GET /full", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/full");
    expect(response.status).toBe(200);
  });

  it("should return dataset IDs starting with either 'Dataset/' or 'STACCollection/'", async () => {
    const response = await request(app).get("/full");
    const datasetIds: IDatasetID[] = response.body.result[0]; // Extract the inner array

    // Regular expression pattern to match "Dataset/" or "STACCollection/"
    const regex = /^(Dataset|STACCollection)\/.*/;

    // Check if all dataset IDs match the pattern
    datasetIds.forEach((id) => {
      expect(id).toMatch(regex);
    });
  });
});

describe("GET /null", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/null");
    expect(response.status).toBe(200);
  });

  it("should return dataset IDs starting with either 'Dataset/' or 'STACCollection/'", async () => {
    const response = await request(app).get("/null");
    const datasetIds: IDatasetID[] = response.body.result[0]; // Extract the inner array

    // Regular expression pattern to match "Dataset/" or "STACCollection/"
    const regex = /^(Dataset|STACCollection)\/.*/;

    // Check if all dataset IDs match the pattern
    datasetIds.forEach((id) => {
      expect(id).toMatch(regex);
    });
  });
});
