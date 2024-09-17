import express, { Request, Response, Router } from "express";
import { IDatasetID } from "../types/types";

const router: Router = express.Router(); // Initialize the router

let keys: IDatasetID[] = []; // Initialize keys as an empty array
router.post("/", async (req: Request, res: Response) => {
  try {
    if (keys.length > 0) {
      // If keys array is not empty, empty it
      keys = [];
    }
    keys.push(req.body.key);
    console.log("Persist Keys for POST request:", keys);
    res.status(200).json({ keys });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ keys });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

/**
 * This file is used to store the previous state or persist the
 * previous state of the dataset_id so that when a new filter is applied
 * the new data will be related to the previous state of the dataset_id.
 */

/**
 * The route will be cleared after every POST request.
 */
