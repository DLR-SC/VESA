/**
 * This Query is used to get all the dataset_ids from the Dataset and STACCollection
 * that are within the given time range.
 *
 * @start - Start date of the time range
 * @end - End date of the time range
 *
 * @returns - Array of dataset_ids
 */

import { AQLQuery } from "../types/types";

export const timechartQuery: AQLQuery = `
LET startDate = @start
LET endDate = @end

LET Dataset_id_list = (
    FOR edge IN HasKeyword
        FILTER CONTAINS(edge._from, 'Dataset/')
        RETURN edge._from
)
LET DatasetID = UNIQUE(Dataset_id_list)

LET sLists = (
    FOR s IN STACCollection
        FILTER (s.extent.temporal.interval[0][0] != null || s.extent.temporal.interval[0][1] != null)
        LET start_date = s.extent.temporal.interval[0][0] != null ? s.extent.temporal.interval[0][0] : startDate
        LET end_date = s.extent.temporal.interval[0][1] != null ? s.extent.temporal.interval[0][1] : DATE_ADD(start_date, 1, "day")
        FILTER startDate <= end_date AND endDate >= start_date
        RETURN s._id
)

LET dLists = (
    FOR d IN Dataset
        FILTER (d._id IN DatasetID && d.extent.temporal != null)
        LET start_date = d.extent.temporal.min_date_time != null ? d.extent.temporal.min_date_time : startDate
        LET end_date = d.extent.temporal.max_date_time != null ? d.extent.temporal.max_date_time : DATE_ADD(start_date, 1, "day")
        FILTER startDate <= end_date AND endDate >= start_date
        RETURN d._id
)

RETURN APPEND(sLists, dLists)
`;
