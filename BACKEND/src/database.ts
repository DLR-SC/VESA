import { Database } from "arangojs";
import dotenv from "dotenv";
import { BasicAuthCredentials } from "arangojs/connection";

// load .env file
dotenv.config();

// Establish connection to database
const db = new Database({
  url: process.env.ARANGO_URL,
  databaseName: process.env.ARANGO_DB_NAME,
  auth: <BasicAuthCredentials>{
    username: process.env.ARANGO_USER,
    password: process.env.ARANGO_PASS,
  },
});

// function to test database connection
export async function connectArango() {
  try {
    console.log(process.env.ARANGO_URL);
    const info = await db.version();
    console.log("Connected to database, version: ", info.version);
  } catch (err) {
    console.error("Failed to connect to database. Error: ", err);
    process.exit(1);
  }
}

export { db };
