/**
 *This query is used to get the abstract of a dataset by its id.
 * @key is retrieved from the request parameters.
 *
 * @returns - Abstract of the dataset
 */

import { AQLQuery } from "../types/types";

export const abstractQuery: AQLQuery = `
    LET DATASET_ID = @keys
    
    LET collection_name = SPLIT(DATASET_ID,"/")[0]      // Splitting the key to get the collection name either Dataset or STACCollection
    
    LET DATASET = (
    FOR doc in Dataset
        FILTER(doc._id == DATASET_ID)
        RETURN doc.text_abstract
    )

    LET STAC = (
    FOR doc in STACCollection
        FILTER(doc._id == DATASET_ID)
        RETURN doc.description
    )

    RETURN collection_name == 'Dataset' ? FIRST(DATASET) : FIRST(STAC)
`;
