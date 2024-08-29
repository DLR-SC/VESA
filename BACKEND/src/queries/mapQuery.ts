/**
 * This file contains the queries to handle the pie chart/different modes
 * present in the map page. The first option is the regular map with all the datasets present
 * The second option is the map with only the datasets that have a full coverage object
 * The third option is the map with only the datasets that have a null coverage object
 */

import { AQLQuery } from "../types/types";

/*
    This query returns a list of dataset_ids that have
    a full coverage object i.e the whole map is covered
*/
/**
 * NOTE : In the current database, the Dataset collection doesn't have any Datasets with
 * full map coverage but instead has the co-ordinate [0,90,0,-90]. In the DOI of these
 * datasets, the coverage is mentioned as global. Hence, the query has been modified to
 * include these datasets as well.
 */

export const mapFullQuery: AQLQuery = `
LET STAC = (
    FOR doc IN STACCollection
        FILTER (doc.extent.spatial.bbox[0][0] == -180 &&
                doc.extent.spatial.bbox[0][2] == 180 &&
                doc.extent.spatial.bbox[0][3] == 90 &&
                doc.extent.spatial.bbox[0][1] == -90 )
    RETURN doc._id
    )

LET DATASET = (
    FOR dataset in Dataset
        FILTER ((dataset.extent.geographic.west_bound_longitude == -180 && 
                dataset.extent.geographic.east_bound_longitude == 180  &&
                dataset.extent.geographic.north_bound_latitude == 90   &&
                dataset.extent.geographic.south_bound_latitude == -90 ) || 
                (dataset.extent.geographic.mean_latitude == 0 &&
                dataset.extent.geographic.mean_longitude == 0 ))
    RETURN dataset._id
    )

RETURN APPEND(STAC, DATASET)
`;

/*
    This query returns a list of dataset_ids that have
    a null coverage object i.e missing map data
*/
export const mapNullQuery: AQLQuery = `
LET STAC = (
    FOR doc IN STACCollection
        FILTER (doc.extent.spatial.bbox[0][0] == null ||
                doc.extent.spatial.bbox[0][2] == null ||
                doc.extent.spatial.bbox[0][3] == null ||
                doc.extent.spatial.bbox[0][1] == null )
    RETURN doc._id
)

LET DATASET = (
    FOR dataset in Dataset
        FILTER (dataset.extent.geographic.mean_latitude == null ||
                dataset.extent.geographic.mean_longitude == null )
    RETURN dataset._id
)

RETURN APPEND(STAC, DATASET)
`;
