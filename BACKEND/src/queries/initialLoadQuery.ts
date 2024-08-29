/* 
    For the initial page load, we want to get all the datasets from the 
    Dataset and the STACCollection in the database.
    This query will return all the dataset ids in the database.
*/

import { AQLQuery } from "../types/types";

export const initialPageLoadQuery: AQLQuery = `
    // LET DatasetID = (
    //     FOR d IN Dataset
    //         LIMIT 1000
    //         RETURN d._id
    //         )
      
    
    //Dataset_id_list contains the dataset ids that have a connection with a keyword
    LET Dataset_id_list = (
        FOR edge IN HasKeyword
            FILTER(CONTAINS(edge._from,'Dataset/'))
            RETURN edge._from
            )
    LET DatasetID = UNIQUE(Dataset_id_list)
    

    LET StacID = (
        FOR s in STACCollection
            RETURN s._id
            )

    LET combined = (APPEND(DatasetID, StacID))

    FOR doc in combined
        RETURN doc
`;

/**
 * Since only 264 out of 3000 datasets have a connection with a keyword,
 * we will use the HasKeyword edge collection to get the dataset ids
 * that have a connection with a keyword.
 *
 * When there are more connections between the dataset and the keyword,
 * Uncomment the first part.
 */
