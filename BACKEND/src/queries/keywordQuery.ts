/* 
    This query is used to get all the keywords from the 
    Dataset collection and the STACCollection.
    Collects all keywords and count along with dataset_ids of 
    all the Dataset that contain the keyword.
*/

/**
 * @param keys - Array of dataset_ids from Dataset and STACCollection
 * @returns - Array of objects containing the keyword, counts and dataset_ids in which the keyword is present
 */

import { AQLQuery } from "../types/types";

export const keywordQuery: AQLQuery = `
LET combined = @keys
LET array = FLATTEN(combined)
LET wordCloudData = (
    FOR d in array
    FOR edge IN HasKeyword
        FILTER(edge._from == d)
        FILTER NOT LIKE(edge._from, "Publication/%")
        COLLECT keywordID = edge._to INTO groups
        LET keyword = DOCUMENT(keywordID)
        
        LET cleanedKeywordtrim = REGEX_REPLACE(keyword.display_name, "\\\\([^)]*\\\\)", "") 
        LET cleanedKeyword = TRIM(cleanedKeywordtrim)
        LET cleanedKeywordNoSlash = REGEX_REPLACE(cleanedKeyword, "/", " ")
        LET cleanedKeywordNoDot = (REGEX_MATCHES(cleanedKeywordNoSlash , "^(?![^\r\n]*\.[A-Za-z]$).*$") != null) 
                                        ?  REGEX_REPLACE(cleanedKeywordNoSlash,".$","")  
                                        :  cleanedKeywordNoSlash                                 
        FILTER REGEX_TEST(cleanedKeywordNoDot, "^[a-zA-Z]")

        LET countRelatedIDs = LENGTH(groups[*].edge._from)
        LET relatedIDs = groups[* FILTER NOT LIKE(CURRENT.edge._from, "Publication/%")].edge._from
        SORT countRelatedIDs DESC
        RETURN {
            keyword : cleanedKeywordNoDot,
            count : countRelatedIDs,
            dataset_id : relatedIDs
        })

RETURN wordCloudData

`;

/* 
  Adding Keyword_id to the query can reduce the post array size
  But have to keep in mind that some keywods are split by comma 
  and the separated keywords should also have the same keyword_id
*/

/**
 * NOTES : '\\\\([^)]*\\\\)' In this regex, \\\\ is used to escape
 *          the backslash character instead of the usual \\
 *          So use \\([^)]*\\) while testing in Arango Console
 */
