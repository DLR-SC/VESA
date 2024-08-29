import express, { Request, Response, Router } from "express";
import { Database } from "arangojs";
import { db } from "../database";
import { mainQuery } from "../queries/mainQuery";
import { initialPageLoadQuery } from "../queries/initialLoadQuery";
import {
  fetchPersistedDatasetIds,
  filterCommonDatasetIds,
} from "../helper/getPersistedDatasetId";
import { IDatasetID, IDataset } from "../types/types";
import { ArrayCursor } from "arangojs/cursor";

const router: Router = express.Router(); // Initialize the router

const database: Database = db; // Initialize the database

let keys: IDatasetID[][] = []; // Initialize keys as an empty array

router.post("/persist", async (req: Request, res: Response) => {
  try {
    keys.push(req.body.key);
    console.log("Keys for POST request:", keys);

    // Fetch persisted dataset IDs
    const persistedDatasetId = await fetchPersistedDatasetIds();

    // Filter common dataset IDs while maintaining the nested structure
    const commonDatasetIds = filterCommonDatasetIds(keys, persistedDatasetId);

    console.log("Persisted Dataset IDs:", persistedDatasetId);
    console.log("Common Dataset IDs:", commonDatasetIds);

    // Query the database immediately after adding keys
    const cursor = await database.query(mainQuery, {
      keys: commonDatasetIds.flat(),
    });
    const result: IDataset[] = await cursor.all(); // Get the dataset object from the database

    res.status(200).json({ result });
    keys = []; // Reset the keys array
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    keys.push(req.body.key);
    console.log("Keys for POST request:", keys);

    // Query the database immediately after adding keys
    const cursor: ArrayCursor<IDataset> = await database.query(mainQuery, {
      keys,
    });
    const result: IDataset[] = await cursor.all(); // Get the dataset object from the database

    res.status(200).json({ result });
    keys = []; // Reset the keys array
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const cursor1 = await database.query(initialPageLoadQuery); // Get all the Dataset_id from the database
    keys = await cursor1.all();
    const cursor: ArrayCursor<IDataset> = await database.query(mainQuery, {
      keys,
    });
    const result: IDataset[] = await cursor.all();
    res.status(200).json({ result });
    keys = [];
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

/* 
    In this route you can send the Dataset_id by post request
    and get the dataset object as a response.
*/

/**
 *  POST request to /main with the Dataset_id returns the dataset objects of only the dataset_id which is posted.
 *
 *  POST request to /main/persist with the Dataset_id returns the dataset objects of the dataset_id which is posted
 *  and also checks if the dataset_id is persisted or not amd returns only the persisted datasets.
 *
 * GET request to /main/all returns all the dataset objects of all the dataset_id  which is used
 * in the initial page load and when the user clicks on the reset button.
 *
 */
