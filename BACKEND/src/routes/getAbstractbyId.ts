import express, { Router, Request, Response } from "express";
import { abstractQuery } from "../queries/abstractQuery";
import { db } from "../database";
import { Database } from "arangojs";
import { IAbstract, IDatasetID, IDatasetKEY } from "../types/types";
import { ArrayCursor } from "arangojs/cursor";
import { checkIdExists } from "../helper/checkIdExists";

const router: Router = express.Router(); // Initialize the router
const database: Database = db; // Initialize the database

router.post("/", async (req: Request, res: Response) => {
  try {
    const key = req.body.key; // Extract the dataset ID from the request body
    const exists: boolean = await checkIdExists(key, database); // Check if the dataset ID exists
    if (!exists) {
      res.status(404).json({ message: "Dataset ID does not exist" });
      return;
    }
    const cursor: ArrayCursor<IAbstract> = await database.query(abstractQuery, {
      keys: key, // Pass the dataset ID as an array
    });
    const result: IAbstract[] = await cursor.all(); // Get the abstract of the dataset from the dataset_id
    res.status(200).json({ result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

/**
 * This file is a route that is used to get the abstract of a dataset by its id.
 * The route is accessed by a POST request to /abstract
 */

/**
 * This is used when the user hovers over the TableView
 */
