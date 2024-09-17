import request from "supertest";
import express from "express";
import router from "../../routes/getDataById";
import { IDataset, IDatasetID } from "../../types/types";

const app = express();
app.use(express.json());
app.use(router);

const key1: IDatasetID[] = [
  "Dataset/495976965",
  "Dataset/495977341",
  "Dataset/496034412",
  "Dataset/496035866",
]; // Only Dataset Collection with Valid IDs

const key2: IDatasetID[] = [
  "STACCollection/3dep-lidar-classification",
  "STACCollection/3dep-lidar-copc",
  "STACCollection/3dep-lidar-dsm",
  "STACCollection/3dep-lidar-dtm",
]; // Only STAC Collection with Valid IDs

const key3: IDatasetID[] = [
  "Dataset/495976965",
  "Dataset/495977341",
  "Dataset/496034412",
  "Dataset/496035866",
  "STACCollection/3dep-lidar-classification",
  "STACCollection/3dep-lidar-copc",
  "STACCollection/3dep-lidar-dsm",
  "STACCollection/3dep-lidar-dtm",
]; // Both Collections with Valid IDs

const expectedPropertyNamesforDataset = [
  "id",
  "location_data",
  "doi",
  "dataset_publication_date",
  "temporal_coverage",
  "authors",
  "dataset_title",
  "organization",
];
const expectedPropertyNamesforSTAC = [
  "id",
  "location_data",
  "doi",
  "temporal_coverage",
  "providers",
  "dataset_title",
  "organization",
];
describe("POST/ GET DATA BY ID FOR ONLY DATASET COLLECTION", () => {
  it("Return the dataset object for the given key array", async () => {
    const response = await request(app)
      .post("/")
      .send({ key: key1 })
      .expect(200); // Expecting a 200 OK response

    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toHaveLength(key1.length);
    // Check if it is an array
    expect(response.body.result).toBeInstanceOf(Array);
    const receivedPropertyNames = Object.keys(response.body.result[0]);
    expect(receivedPropertyNames).toEqual(
      expect.arrayContaining(expectedPropertyNamesforDataset)
    );
  });
  it("Return the dataset object for the given key array", async () => {
    const response = await request(app)
      .post("/")
      .send({ key: key2 })
      .expect(200); // Expecting a 200 OK response

    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toHaveLength(key2.length);
    // Check if it is an array
    expect(response.body.result).toBeInstanceOf(Array);
    const receivedPropertyNames = Object.keys(response.body.result[0]);
    expect(receivedPropertyNames).toEqual(
      expect.arrayContaining(expectedPropertyNamesforSTAC)
    );
  });

  it("Return the dataset object for the either Dataset or STACCollection key array", async () => {
    const response = await request(app)
      .post("/")
      .send({ key: key3 })
      .expect(200); // Expecting a 200 OK response

    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toHaveLength(key3.length);
    // Check if it is an array
    expect(response.body.result).toBeInstanceOf(Array);

    // Iterate through each item in the response
    response.body.result.forEach((item: IDataset) => {
      // Determine the expected property names based on the type of item
      const expectedPropertyNames = item.id.startsWith("Dataset")
        ? expectedPropertyNamesforDataset
        : expectedPropertyNamesforSTAC;

      // Assert that the received data has the expected property names
      const receivedPropertyNames = Object.keys(item);
      expect(receivedPropertyNames).toEqual(
        expect.arrayContaining(expectedPropertyNames)
      );
    });
  });
});

describe("GET/all GET DATA BY ID FOR ONLY DATASET COLLECTION", () => {
  it("Returns all the Dataset and STACCollection objects for the entire DB", async () => {
    const response = await request(app).get("/all").expect(200); // Expecting a 200 OK response
    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toBeInstanceOf(Array);
  });
});

let server: any;
beforeAll((done) => {
  server = app.listen(done);
});
afterAll((done) => {
  server.close(done);
});
