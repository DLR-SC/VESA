/*
  This query recieves a list of dataset_id
  from a POST request,
  and returns information about the PANGAEA dataset and STAC dataset
*/

import { AQLQuery } from "../types/types";

/*
          RESPONSE INTERFACE
    {
      id: string,
      locationData : {
        west_bound_longitude : number, 
        east_bound_longitude : number,
        north_bound_longitude : number, 
        south_bound_longitude : number, 
        mean_latitude : number,
        mean_longitude : number
      },
      doi : string,
      dataset_publication_date ?: string, // This is only for PANGAEA
      temporal_coverage : {
        start_date : string,
        end_date : string
      },
      authors ?: string[], // This is only for PANGAEA
      providers ?: string[], // This is only for STAC
      dataset_title : string
      organization : string
    }
*/

/**
 * @param keys - Array of dataset ids
 * @returns - Array of objects containing Dataset/STACCollection information
 */

export const mainQuery: AQLQuery = `
LET arrayList = @keys
LET array = FLATTEN(arrayList)

FOR a IN array
    LET d = SPLIT(a,"/")[0]  // Splitting the key to get the collection name either Dataset or STACCollection
    LET id = SPLIT(a,"/")[1]   // Splitting the key to get the id of the dataset
    LET DATASETQUERY = (
        FOR dataset IN Dataset
        FILTER (dataset._key == id)
        LET Did = dataset._id
        LET KeywordIDList = (
            FOR h IN HasKeyword
            FILTER h._from == Did
            RETURN h._to
        )

        LET authorList = (
            FOR h IN HasAuthor
            FILTER h._from == Did
            RETURN h._to
        )
        LET authorNameList = (
            FOR al IN authorList
            FOR author IN Author
            FILTER (al == author._id)
            RETURN CONCAT(author.first_name, ' ', author.last_name)
        )

        LET start = dataset.extent.temporal.min_date_time
        LET end = dataset.extent.temporal.max_date_time

        // Check if the both start and end date are null
        LET nullStart = (dataset.extent.temporal.min_date_time == null) ? null : dataset.extent.temporal.min_date_time
        LET endStart = (dataset.extent.temporal.max_date_time == null) ? null : dataset.extent.temporal.max_date_time

        // If start date is not null and end date is null, then set end date to start date + 1 day
        LET start_date_1 = ((nullStart != null)&&(endStart == null)) ? nullStart : dataset.extent.temporal.min_date_time
        LET end_date_1 = ((nullStart!= null) &&(endStart == null)) ? DATE_ADD(start_date_1,1,"day") : dataset.extent.temporal.max_date_time

        // if both start and end date are same, then set end date to end date + 1 day
        LET start_date = (start_date_1 == end_date_1) ? start_date_1 : start_date_1
        LET end_date = (start_date_1 == end_date_1) ? DATE_ADD(end_date_1,1,"day") : end_date_1

        RETURN {
            id: dataset._id,
            location_data: {
                west_bound_longitude: dataset.extent.geographic.west_bound_longitude,
                east_bound_longitude: dataset.extent.geographic.east_bound_longitude,
                north_bound_latitude: dataset.extent.geographic.north_bound_latitude,
                south_bound_latitude: dataset.extent.geographic.south_bound_latitude,
                mean_latitude: dataset.extent.geographic.mean_latitude,
                mean_longitude: dataset.extent.geographic.mean_longitude
            },
            doi: dataset.uri,
            dataset_publication_date: dataset.publication_date,
            temporal_coverage: {
                start_date: start_date,
                end_date: end_date
            },
            authors: authorNameList,
            dataset_title: dataset.title,
            organization: 'PANGAEA'
         }
    )
    
    LET STACQUERY = (
        LET STACList = (
            FOR stac IN STACCollection
            FILTER stac._key == id
            RETURN stac
        )
        FOR s IN STACList
            LET LINKS = s.links[*].href
            LET filteredLinks = (
                FOR link in LINKS
                FILTER CONTAINS(link, 'geoservice') || CONTAINS(link, 'doi.org')
                LIMIT 1
                RETURN link
            )
           LET firstLink = LENGTH(filteredLinks) > 0 ? filteredLinks[0] : LINKS[0]
            
            //get the start and end date of the dataset
            LET start = s.extent.temporal.interval[0][0]
            LET end = s.extent.temporal.interval[0][1]
        
            // Check if the both start and end date are null
            LET nullStart = (s.extent.temporal.interval[0][0] == null) ? null : s.extent.temporal.interval[0][0]
            LET endStart = (s.extent.temporal.interval[0][1] == null) ? null : s.extent.temporal.interval[0][1]

            // If start date is not null and end date is null, then set end date to start date + 1 day
            LET start_date_1 = ((nullStart != null)&&(endStart == null)) ? nullStart : s.extent.temporal.interval[0][0]
            LET end_date_1 = ((nullStart!= null) &&(endStart == null)) ? DATE_ADD(start_date_1,1,"day") : s.extent.temporal.interval[0][1]
                
            // if both start and end date are same, then set end date to end date + 1 day
            LET start_date = (start_date_1 == end_date_1) ? start_date_1 : start_date_1
            LET end_date = (start_date_1 == end_date_1) ? DATE_ADD(end_date_1,1,"day") : end_date_1

            RETURN {
                id: s._id,
                location_data: {
                    west_bound_longitude: s.extent.spatial.bbox[0][0],
                    east_bound_longitude: s.extent.spatial.bbox[0][2],
                    north_bound_latitude: s.extent.spatial.bbox[0][3],
                    south_bound_latitude: s.extent.spatial.bbox[0][1],
                    mean_longitude: (s.extent.spatial.bbox[0][0] + s.extent.spatial.bbox[0][2]) / 2,
                    mean_latitude: (s.extent.spatial.bbox[0][1] + s.extent.spatial.bbox[0][3]) / 2,
                },
                doi: firstLink,
                temporal_coverage: {
                    start_date: start_date,
                    end_date: end_date
                },
                providers : s.providers[*].name,
                dataset_title: s.title,
                organization: 'Earth Observatory'
            }
    )

    RETURN d == 'Dataset' ? FIRST(DATASETQUERY) : FIRST(STACQUERY)
`;
