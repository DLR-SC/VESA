import express, { Request, Response, Router } from "express";
import { Database } from "arangojs";

import { db } from "../database";

import { timechartQuery } from "../queries/timechartQuery";
import { mainQuery } from "../queries/mainQuery";
import { keywordQuery } from "../queries/keywordQuery";
import {
  fetchPersistedDatasetIds,
  filterCommonDatasetIds,
} from "../helper/getPersistedDatasetId";
import { IDataset, IDatasetID } from "../types/types";
import { ArrayCursor } from "arangojs/cursor";

const router: Router = express.Router(); // Initialize the router
const database: Database = db; // Initialize the database

let keys: IDatasetID[][] = []; // Initialize keys as an empty array

/**
 *
 * @param start Date
 * @param end Date
 * @returns Promise<IDatasetID[]>
 *
 * This function fetched the dataset_id by using the start and end time/date
 */
const getDatasetIdByTime = async (
  start: Date,
  end: Date
): Promise<IDatasetID[]> => {
  try {
    const cursor: ArrayCursor<IDatasetID> = await database.query(
      timechartQuery,
      { start, end }
    );
    const result: IDatasetID[] = await cursor.all();
    return result.flat().map((item: any) => item);
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

router.post("/main", async (req: Request, res: Response) => {
  try {
    let start = req.body.start;
    let end = req.body.end;

    /**
     * If the start and end date are in string format, convert them to ISO format
     */
    if (typeof start == "string" || typeof end == "string") {
      start = new Date(start).toISOString();
      end = new Date(end).toISOString();
    }

    const result2: IDatasetID[] | null = await getDatasetIdByTime(start, end);

    keys.push(result2); //push the Dataset_IDs to keys array

    console.log("Keys for POST request:", keys);
    const cursor: ArrayCursor<IDataset> = await database.query(mainQuery, {
      keys,
    }); // Query the database for the dataset object for the given dataset_ids[keys]
    const result: IDataset[] = await cursor.all(); // Get the dataset object from the database
    res.status(200).json({ result });
    keys = [];
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/keyword", async (req: Request, res: Response) => {
  try {
    let start = req.body.start;
    let end = req.body.end;

    /**
     * If the start and end date are in string format, convert them to ISO format
     */
    if (typeof start == "string" || typeof end == "string") {
      start = new Date(start).toISOString();
      end = new Date(end).toISOString();
    }

    const result2: IDatasetID[] | null = await getDatasetIdByTime(start, end);

    keys.push(result2); //push the Dataset_IDs to keys array

    console.log("Keys for POST request:", keys);
    const cursor: ArrayCursor<IDataset> = await database.query(keywordQuery, {
      keys,
    }); // Query the database for the dataset object for the given dataset_ids[keys]
    const result: IDataset[] = await cursor.all(); // Get the dataset object from the database
    res.status(200).json({ result });
    keys = [];
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/main/persist", async (req: Request, res: Response) => {
  try {
    let start = req.body.start;
    let end = req.body.end;

    if (typeof start == "string" || typeof end == "string") {
      start = new Date(start).toISOString();
      end = new Date(end).toISOString();
    }

    const result2: IDatasetID[] | null = await getDatasetIdByTime(start, end);

    //push the Dataset_IDs to keys array
    keys.push(result2);

    console.log("Keys for POST request:", keys);

    // Fetch persisted dataset IDs
    const persistedDatasetId = await fetchPersistedDatasetIds();

    // Filter common dataset IDs while maintaining the nested structure
    const commonDatasetIds = filterCommonDatasetIds(keys, persistedDatasetId);

    console.log("Persisted Dataset IDs:", persistedDatasetId);
    console.log("Common Dataset IDs:", commonDatasetIds);

    // Query the database for the dataset object for the given dataset_ids[keys]
    const cursor: ArrayCursor<IDataset> = await database.query(mainQuery, {
      keys: commonDatasetIds.flat(),
    });
    const result: IDataset[] = await cursor.all(); // Get the dataset object from the database

    res.status(200).json({ result });
    keys = [];
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/keyword/persist", async (req: Request, res: Response) => {
  try {
    let start = req.body.start;
    let end = req.body.end;

    if (typeof start == "string" || typeof end == "string") {
      start = new Date(start).toISOString();
      end = new Date(end).toISOString();
    }

    const result2: IDatasetID[] | null = await getDatasetIdByTime(start, end);

    //push the Dataset_IDs to keys array
    keys.push(result2);

    console.log("Keys for POST request:", keys);

    // Fetch persisted dataset IDs
    const persistedDatasetId = await fetchPersistedDatasetIds();

    // Filter common dataset IDs while maintaining the nested structure
    const commonDatasetIds = filterCommonDatasetIds(keys, persistedDatasetId);

    console.log("Persisted Dataset IDs:", persistedDatasetId);
    console.log("Common Dataset IDs:", commonDatasetIds);

    // Query the database for the dataset object for the given dataset_ids[keys]
    const cursor: ArrayCursor<IDataset> = await database.query(keywordQuery, {
      keys: commonDatasetIds.flat(),
    });
    const result: IDataset[] = await cursor.all(); // Get the dataset object from the database

    res.status(200).json({ result });
    keys = [];
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

/*
    This route is used to get the dataset_id by
    using the start and end time/date from the
    TIME SERIES CHART from the frontend.
*/

/**
 *  POST request to /time with the start and end date fetches all Datasets which
 *  are within the given time range.
 *
 *  POST request to /time/persist with the start and end date fetches all Datasets
 *  which are within the given time range and are persisted from previously applied filters.
 */
