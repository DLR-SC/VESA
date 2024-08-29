import { JSONPath } from "jsonpath-plus";
import axios from "axios";
import express, { Request, Response } from "express";
import { db } from "../../database";

// Define the organization color mapping type
type OrganizationName = "PANGAEA" | "DLR" | "EO" | "default";
type OrganizationColorMapping = {
  [key in OrganizationName]: string;
};

const organizationColor: OrganizationColorMapping = {
  PANGAEA: "#FF0000",
  DLR: "#FFA500",
  EO: "#FFFF00",
  default: "#000000",
};

// Define the getColor function type
type GetColorFunction = (url: string) => Promise<string>;

const getColor: GetColorFunction = async (url: string) => {
  try {
    const response = await axios.get(url);
    const color = JSONPath({
      path: "$.result.organization.title",
      json: response.data,
    }) as keyof OrganizationColorMapping;

    return organizationColor[color] || organizationColor.default;
  } catch (error) {
    console.error("Error fetching organization color:", error);
    return organizationColor.default;
  }
};

const router = express.Router();

//impliment an independent function to get the color of the organization and not a router

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = `
      FOR d IN Dataset
      // LIMIT 1000
      FILTER d.eudat_api_url != null
      RETURN d.eudat_api_url
    `;

    const cursor = await db.query(query);
    const result = await cursor.all();

    const urls = result.map((url: any) => url);

    const colorPromises = urls.map((url: string) => getColor(url));
    const colors = await Promise.all(colorPromises);

    res.json({ colors });
  } catch (error: any) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: error });
  }
});

export default router;
