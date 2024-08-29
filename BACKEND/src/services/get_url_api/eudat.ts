import express, { Router, Response, Request } from 'express';
import { JSONPath } from 'jsonpath-plus';
import axios from 'axios';

const router: Router = express.Router();

const eudatUrl = 'https://api.eudat.org/works/W3129465876';

/**
 * Fetches JSON data from the eudat API.
 * @param eudatUrl - The URL of the eudat API endpoint.
 * @returns {Promise<any>} - A promise that resolves to the fetched JSON data.
 */
const getEudatData = async (eudatUrl: string): Promise<any> => {
    try {
        const response = await axios.get(eudatUrl);

        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves keywords from eudat API data.
 * @returns {Promise<string[]>} - A promise that resolves to an array of keywords.
 */
const getKeywords = async (): Promise<string[]> => {
    const eudatData = await getEudatData(eudatUrl);

    // Use JSONPath to extract keywords from the JSON data
    const keywords = JSONPath({ path: '$.keywords[*]', json: eudatData });

    return keywords.map((keyword: any) => keyword.keyword);
}

/**
 * Handles HTTP GET requests for the '/api/keywords' route.
 * Retrieves keywords and sends a JSON response.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const keywords = await getKeywords();

        res.json({ keywords: keywords });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Export the router and getKeywords function for external use
export default { router, getKeywords };
