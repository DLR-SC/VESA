import { getLocationNameFromAPI } from "../services/Maps/getLocationName";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router(); // Initialize the router

router.post("/", async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.body;
    const locationName = await getLocationNameFromAPI(lat, lon);
    res.status(200).json({ locationName });
  } catch (error: any) {
    // Check for specific error types and return appropriate error messages
    if (error.response && error.response.data && error.response.data.error) {
      const { code, message } = error.response.data.error;
      res
        .status(500)
        .json({ message: `Error Code: ${code}, Message: ${message}` });
    } else {
      // For other errors, return a generic error message
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;

/**
 * Since the API we are using is a free API, it has a limit on
 * the number of requests that can be made in a second. (1req/sec)
 *
 * To avoid the rate limit, we are using a delay of 1 second between
 * each request in the test cases.
 *
 * Error Code 429: Too many requests
 *
 */
