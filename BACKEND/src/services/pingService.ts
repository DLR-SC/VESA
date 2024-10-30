import { Database } from "arangojs";
import { db } from "../database";

const database: Database = db;

// Function to ping the database
export const pingDatabase = async () => {
  try {
    const cursor = await database.query("RETURN 1");
    console.log("Database ping successful:", await cursor.all());
    return true; // Return true if ping is successful
  } catch (error) {
    console.error("Database ping failed:", error);
    return false; // Return false if ping fails
  }
};

console.log("Database ping service ready for on-demand health checks.");
