import request from "supertest";
import express, { response } from "express";
import router from "../../routes/getDataIdbyTime";
import { IDataset, IDatasetID, IKeyword } from "../../types/types";

const app = express();
app.use(express.json());
app.use(router);

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

const expectedPropertyNamesforKeyword = ["keyword", "count", "dataset_id"];

describe("GET DATA BY ID FOR THE GIVEN START AND END TIME", () => {
  it("Return the dataset/staccollection object for the given key array", async () => {
    const response = await request(app)
      .post("/main")
      .send({ start: "2017-03-28", end: "2017-05-28" })
      .expect(200); // Expecting a 200 OK response

    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toBeInstanceOf(Array);
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

  it("Returns an empty array if no dataset/staccollection object is found for the given key array", async () => {
    const response = await request(app)
      .post("/main")
      .send({ start: "2023-03-28", end: "2023-05-28" })
      .expect(200); // Expecting a 200 OK response

    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toHaveLength(0);
  });

  // it("Returns an error if the start and end date are not in the correct format", async () => {
  //   await request(app)
  //     .post("/main")
  //     .send({ start: "20230328", end: "20230528" })
  //     .expect(500); // Expecting a 500 Internal Server Error response
  // });
});

//

describe("GET KEYWORDS FOR GIVEN START TIME AND END TIME", () => {
  it("Returns Keyword Object for the given start and end time", async () => {
    const response = await request(app)
      .post("/keyword")
      .send({ start: "2017-03-28", end: "2017-05-28" })
      .expect(200);

    expect(response.body).toHaveProperty("result");
    expect(response.body.result).toBeInstanceOf(Array);
    response.body.result[0].forEach((item: IKeyword) => {
      const receivedPropertyNames = Object.keys(item);
      expect(receivedPropertyNames).toEqual(
        expect.arrayContaining(expectedPropertyNamesforKeyword)
      );
    });
  });
});
