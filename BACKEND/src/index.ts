import express, { Request, Response, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { connectArango } from "./database";

// IMPORT ROUTES
import mainRouter from "./routes/getDataById";
import wordRouter from "./routes/getKeywords";
import timeRouter from "./routes/getDataIdbyTime";
import abstractRouter from "./routes/getAbstractbyId";
import authorRouter from "./routes/getAuthorById";
import mapRouter from "./routes/getMapData";
import persistantRouter from "./routes/persist";
import healthCheckRouter from "./routes/healthCheck";

import locationNameRouter from "./routes/getLocationName";

const expressPort = process.env.NODE_PORT;
const app = express();

// load .env file
dotenv.config();

//Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use json for API routes
app.use(express.json());

// cors for api address/port
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Establish connection to database
connectArango();

/* ROUTES */

// POST /main
// POST /main/persist
// GET /main/all
app.use("/main", mainRouter);

// POST /keywords
// GET /keywords/all
app.use("/keywords", wordRouter);

// POST /time
// POST /time/persist
app.use("/time", timeRouter);

// POST /abstract
app.use("/abstract", abstractRouter);

// POST /author
app.use("/author", authorRouter);

// GET /map/full
// GET /map/null
app.use("/map", mapRouter);
app.use("/locname", locationNameRouter);

// POST /persist
app.use("/persist", persistantRouter);

// Services health poll
app.use("/health", healthCheckRouter);

app.listen(expressPort, () => {
  console.log(`Server started on port ${expressPort}`);
});
