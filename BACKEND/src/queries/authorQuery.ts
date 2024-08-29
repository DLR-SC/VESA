/**
 * @keys is retrieved from the request parameters. It is the list of dataset ids
 *
 * @returns - List of authors and the datasets(id) they have authored
 */

import { AQLQuery } from "../types/types";

export const authorQuery: AQLQuery = `
LET idLists = @keys
FOR datasetId IN idLists
  FOR edge IN HasAuthor
    FILTER edge._from == datasetId
    FOR author IN Author
      FILTER edge._to == author._id
      COLLECT authorName = author.display_name INTO groupedDatasets
      RETURN {
        author: authorName,
        datasets: groupedDatasets[*].edge._from
      }
`;

/**
 * This query is used to get the List of authors and the datasets(id) they have authored
 * You have to POST the datasets id of all the datasets which is valid(filters applied)
 * to get the authors of those datasets
 */
