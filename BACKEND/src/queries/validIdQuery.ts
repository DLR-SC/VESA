import { AQLQuery } from "../types/types";

export const isValidIdQuery: AQLQuery = `
LET id = @key

LET DATASET = (
    FOR doc in Dataset
        FILTER(doc._id == id)
        RETURN true
    )
    
LET STAC = (
    FOR doc in STACCollection   
        FILTER(doc._id == id)
        RETURN true
    )

RETURN (LENGTH(DATASET) > 0 || LENGTH(STAC) > 0)

`;

export const isValidIdArrayQuery: AQLQuery = `
LET ids = @keys

LET datasetCount = (
  FOR id IN ids
    FOR doc IN Dataset
      FILTER doc._id == id
      COLLECT WITH COUNT INTO length
      RETURN length
)[0]

LET stacCount = (
  FOR id IN ids
    FOR doc IN STACCollection  
      FILTER doc._id == id
      COLLECT WITH COUNT INTO length
      RETURN length
)[0]

RETURN (datasetCount + stacCount) == LENGTH(ids) 

`;

/**
 * This query is used to check if the id exists in the Dataset or STACCollection
 * @key is retrieved from the request parameters.
 * Returns true if the id exists in either of the collections
 */
