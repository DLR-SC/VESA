import { keywordQuery } from "../queries/keywordQuery";
import express, { Request, Response, Router } from "express";
import { Database } from "arangojs";
import { db } from "../database";
import { initialPageLoadQuery } from "../queries/initialLoadQuery";
import processResult from "../services/Wordcloud/lenghtFiltering";
import { IDatasetID, IKeyword } from "../types/types";
import { ArrayCursor } from "arangojs/cursor";

const router: Router = express.Router(); // Initialize the router

const database: Database = db; // Initialize the database

let keys: IDatasetID[] = []; // Initialize keys as an empty array

router.post("/", async (req: Request, res: Response) => {
  try {
    keys.push(req.body.key); // Push the dataset_id to the keys array
    const cursor: ArrayCursor<IKeyword[]> = await database.query(keywordQuery, {
      keys,
    });
    const result: IKeyword[][] = await cursor.all(); // Get the Keywords of the dataset from the dataset_id[keys]

    const keywords: IKeyword[] = processResult(result); // Process the result to get the keywords

    res.status(200).json({ result: keywords });
    keys = []; // Reset the keys array
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const cursor1 = await database.query(initialPageLoadQuery);
    const keys = await cursor1.all(); // Get all the dataset_id from the database
    const cursor = await database.query(keywordQuery, { keys });

    const result = await cursor.all();

    const keywords: IKeyword[] = processResult(result);

    res.status(200).json({ result: keywords });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

/*
  keyword {
    keyword: string;
    count: number;
    ^dataset_id: IDatasetID[];
  }
*/

/**
 * This file is a route that is used to get the keywords of a dataset by its id.
 * The route is accessed by a POST request to /keywords.
 */

/**
 * This is used for the Wordcloud component.
 * When a single keyword is clicked, the ^dataset_id array of that
 * keyword is sent to the backend and all the datasets/keywords with that
 * dataset_ids are returned.
 */
