import express, { Request, Response, Router } from "express";
import { Database } from "arangojs";
import { db } from "../database";
import { IDatasetID } from "../types/types";
import { ArrayCursor } from "arangojs/cursor";
import { authorQuery } from "../queries/authorQuery";
import { initialPageLoadQuery } from "../queries/initialLoadQuery";

const router: Router = express.Router(); // Initialize the router
const database: Database = db; // Initialize the database

let keys: IDatasetID[] = []; // Initialize keys as an empty array

interface IAuthorResponse {
  author: string;
  datasets: IDatasetID[];
}
router.post("/", async (req: Request, res: Response) => {
  try {
    keys = req.body.keys;
    const cursor: ArrayCursor<IAuthorResponse> = await database.query(
      authorQuery,
      {
        keys,
      }
    );
    const result: IAuthorResponse[] = await cursor.all();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err || "Internal Server Error" });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const cursor1: ArrayCursor<IDatasetID> = await database.query(
      initialPageLoadQuery
    );
    keys = await cursor1.all();
    const cursor: ArrayCursor<IAuthorResponse> = await database.query(
      authorQuery,
      {
        keys,
      }
    );
    const result: IAuthorResponse[] = await cursor.all();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err || "Internal Server Error" });
  }
});

export default router;
