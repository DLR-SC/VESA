// /*
//   Get the all the initial data for the page load
// */

// import express, { Request, Response, Router } from "express";
// import { Database } from "arangojs";
// import { db } from "../database";
// import { mainQuery } from "../queries/mainQuery";
// import { initialDatasetPageLoadQuery } from "../queries/initialLoadQuery";

// const router: Router = express.Router();

// const database: Database = db;

// const initalQuery: string = initialDatasetPageLoadQuery;
// const getAllDataQuery: string = mainQuery;

// // router

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const cursor1 = await database.query(initalQuery);
//     let keys = await cursor1.all();

//     // console.log("Keys for GET request:", keys); // Log keys to check their values
//     const cursor = await database.query(getAllDataQuery, { keys });
//     const result = await cursor.all();
//     res.status(200).json({ result });
//     keys = [];
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;
