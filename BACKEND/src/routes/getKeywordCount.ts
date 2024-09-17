import express, { Request, Response, Router } from "express";
import axios from "axios";
import processResult from "../services/Wordcloud/lenghtFiltering";
import { IKeyword } from "../types/types";

const router: Router = express.Router(); // Initialize the router

// /**
//  * Route to get all keywords and their TF-IDF scores
//  * @param req - Express Request object
//  * @param res - Express Response object
//  */

//get the result from localhost:3001/keywords

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:3001/keywords");
    const result: IKeyword[][] = response.data.result; // Get the result from the response

    /* 
      The result here contains the following structure:
      {
        Keyword: string,
        count : number // count here is the actual count of the keywords
        DatasetID : IDatasetID[]
      }
    */

    // Extract only the keywords from the result
    const keywords: IKeyword[] = processResult(result);

    res.status(200).json({ result: keywords });
  } catch (err) {
    res.status(500).json({ error: err || "Internal Server Error" });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("http://localhost:3001/keywords/all");
    const result: IKeyword[][] = response.data.result;

    // Extract only the keywords from the result
    const keywords: IKeyword[] = processResult(result);

    res.status(200).json({ result: keywords });
  } catch (err) {
    res.status(500).json({ error: err || "Internal Server Error" });
  }
});

export default router;

/**
 * This file is a route that gets the keywords from the database
 * They keywords here are not filtered and no tf-idf scores are calculated
 */
