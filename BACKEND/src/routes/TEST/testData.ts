import express, { Request, Response, Router } from "express";
import { Database } from "arangojs";
import { db } from "../../database";

//initialize router and database
const router: Router = express.Router();
const database: Database = db;

//INTERFACE FOR RESULTS
interface ILocation {
  lat: number | null;
  lon: number | null;
}

interface IDate {
  pub_year: number | null;
}

interface IKeyword {
  keyword: string | null;
  count: number | null;
}

export interface ICombinedResult {
  location: ILocation;
  date: IDate;
  keyword: IKeyword;
}

const locationQuery: string = `
  FOR d IN Dataset
    FILTER (d.coverage.meanLatitude != null || d.coverage.meanLongitude != null)
    RETURN {
      lat: d.coverage.meanLatitude,
      lon: d.coverage.meanLongitude
    }
`;

const dateQuery: string = `
  FOR d IN Publication
    FILTER d.date != null
    RETURN {
      pub_date: d.date
    }
`;

const keywordQuery: string = `
  LET words = (
    FOR p IN Publication
      FILTER p.keywords != null   
      RETURN p.keywords
  )
  
  LET keywords = (
    FOR k IN FLATTEN(words)
      FILTER k != ""
      RETURN TRIM(LOWER(k))
  )

    FOR string IN keywords
      COLLECT str = string WITH COUNT INTO count
      RETURN { keyword: str, count: count }
`;

let locationResult: ILocation[] = [];
let dateResult: IDate[] = [];
let keywordResult: IKeyword[] = [];

/**
 * Combines results from location, date, and keyword queries into a single array of ICombinedResult.
 * @returns {ICombinedResult[]} Array containing combined results.
 */
const combineResults = (): ICombinedResult[] => {
  const maxLength = Math.max(
    locationResult.length,
    dateResult.length,
    keywordResult.length
  );
  const combinedResult: ICombinedResult[] = [];

  for (let i = 0; i < maxLength; i++) {
    const combinedObject: ICombinedResult = {
      location: locationResult[i] || { lat: null, lon: null },
      date: dateResult[i] || { pub_year: null },
      keyword: keywordResult[i] || { keyword: null, count: null },
    };

    combinedResult.push(combinedObject);
  }

  return combinedResult;
};

/**
 * Fetches data from a given query and populates the resultArray with the obtained results.
 * @param {string} query - ArangoDB AQL query string.
 * @param {any[]} resultArray - Array to store the fetched results.
 */
const fetchData = async (query: string, resultArray: any[]) => {
  const cursor = await database.query(query);
  const results = await cursor.all();
  resultArray.length = 0; // Clear the array
  resultArray.push(...results); // Push the new results into the array
};

const getLocations = async () => {
  await fetchData(locationQuery, locationResult);
};

const getDates = async () => {
  await fetchData(dateQuery, dateResult);
};

const getKeywords = async () => {
  await fetchData(keywordQuery, keywordResult);
};

export let combinedResult: ICombinedResult[] = [];

Promise.all([getLocations(), getDates(), getKeywords()])
  .then(() => {
    combinedResult = combineResults();
    // Send the combined results

    /**
     * Route to get combined results based on a specified key
     * @param req - Express Request object
     * @param res - Express Response object
     */
    router.get("/", async (req: Request, res: Response) => {
      try {
        res.json({ combinedResult: combinedResult });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default router;
