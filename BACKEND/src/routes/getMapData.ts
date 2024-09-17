import express, { Request, Response, Router } from "express";
import { mapFullQuery, mapNullQuery } from "../queries/mapQuery";
import { db } from "../database";
import { Database } from "arangojs";
import { IDatasetID } from "../types/types";
import { ArrayCursor } from "arangojs/cursor";

const router: Router = express.Router(); // Initialize the router

const database: Database = db; // Initialize the database

router.get("/full", async (req: Request, res: Response) => {
  try {
    const cursor: ArrayCursor<IDatasetID> = await database.query(mapFullQuery); // Query the database to get the dataset_id
    const result: IDatasetID[] = await cursor.all(); // Get the dataset_id from the database
    res.status(200).json({ result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/null", async (req: Request, res: Response) => {
  try {
    const cursor: ArrayCursor<IDatasetID> = await database.query(mapNullQuery);
    const result: IDatasetID[] = await cursor.all();
    res.status(200).json({ result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

/**
 * This file is a route that is used to get the dataset_id of the datasets
 * that have co-ordinates which are valid for the entire map and the datasets
 * that have co-ordinates which are null.
 */

/**
 * This is used for the different MAP views
 */

/**
 * The /full route is used to get the dataset_id of the datasets that have co-ordinates
 * which are valid for the entire map.
 *
 * The /null route is used to get the dataset_id of the datasets that have co-ordinates
 * which are null.
 */
