import express, { Request, Response, Router } from "express";
import { Database } from "arangojs";
import { db } from "../../database";
import { ICombinedResult, combinedResult } from "./testData";

const router: Router = express.Router();
const database: Database = db;

const relatedKeywordsQuery: string = `
    LET kws = (
        FOR k IN Keyword
            FILTER k._key == @key
            FOR hasKey IN HasKeyword
                FILTER hasKey._to == k._id
                FOR p IN Publication
                    FILTER p._id == hasKey._from
                    RETURN p.keywords
    )
                     
    LET words = FLATTEN(kws)

    LET related = (
        FOR word IN words
        RETURN TRIM(LOWER(word))
    )
            
    RETURN UNIQUE(related)
`;

/**
 * Route to get combined results based on a specified key
 * @param req - Express Request object
 * @param res - Express Response object
 */
router.get("/:key", async (req: Request, res: Response) => {
  // Extract the key parameter from the request
  const key: string = req.params.key;

  try {
    // Execute the related keywords query
    const cursor = await database.query(relatedKeywordsQuery, { key: key });
    const result = await cursor.all();

    // Extract unique related keywords from the query result
    const relatedKeywords = result[0].map((element: string) => element);

    // Filter the combined results based on the related keywords
    const filteredResults = combinedResult.filter(
      (element: ICombinedResult) => {
        return relatedKeywords.includes(element.keyword.keyword);
      }
    );

    // Send the filtered results as JSON response
    res.status(200).json({ combinedResult: filteredResults });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
