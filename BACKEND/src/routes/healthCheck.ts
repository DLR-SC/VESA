import express, { Request, Response, Router } from "express";
import { pingDatabase } from "../services/pingService";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const dbStatus = await pingDatabase(); // Ping the database

  if (dbStatus) {
    res.status(200).send("OK, Node service and database are healthy");
  } else {
    res.status(500).send("Database connection failed");
  }
});

export default router;
