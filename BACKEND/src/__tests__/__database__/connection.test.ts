import { Database } from "arangojs";
import { db } from "../../database";
import supertest from "supertest";

const database: Database = db;

describe("ArangoDB Connection", () => {
  // Test if the ArangoDB instance is reachable
  test("should connect to ArangoDB", async () => {
    // Attempt to connect to ArangoDB
    try {
      await database.get();
      // If connection is successful, expect status 200
      expect(true).toBe(true);
    } catch (error) {
      // If connection fails, expect an error
      expect(error).toBeNull();
    }
  });
});

/**
 * There is no point in test the regex according to Issue #63
 */
