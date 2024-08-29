// import { JSONPath } from "jsonpath-plus";
// import axios from "axios";
// import express, { Request, Response } from "express";
// import { db } from "../../database";

// const router = express.Router();

// const getDate = async (url: string) => {
//   try {
//     const response = await axios.get(url);
//     const date = JSONPath({
//       path: "$.result.extras[?(@.key == 'Publisher')].value",
//       json: response.data,
//     }) as string;

//     return date;
//   } catch (error) {
//     console.error("Error fetching date:", error);
//     throw error; // throw the error to be caught by Promise.all
//   }
// };

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const query = `
//       FOR d IN Dataset
//       // LIMIT 1000
//       FILTER d.eudat_api_url != null
//       RETURN d.eudat_api_url
//     `;

//     const cursor = await db.query(query);
//     const result = await cursor.all();

//     const urls = result.map((url: any) => url);

//     const datePromises = urls.map((url: string) => getDate(url));

//     const dates = await Promise.allSettled(datePromises);

//     const validDates = dates
//       .filter((result) => result.status === "fulfilled")
//       .map((result) => (result as PromiseFulfilledResult<string>).value);

//     res.json({ dates: validDates });
//   } catch (error) {
//     console.error("Error fetching dates:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;
