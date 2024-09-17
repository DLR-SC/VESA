import {
  useGetRelatedDatasetsMutation,
  useGetRelatedKeywordDataMutation,
  useGetTimeDatasetDataMutation,
  useGetTimeKeywordDataMutation,
  useGetAuthorDataMutation,
} from "store/services/dataApi";
import { IDatasetID, TemporalCoverage } from "types/appData";

export const useQuery = () => {
  const [getRelatedKeywordsPostRequest, { isLoading }] =
    useGetRelatedKeywordDataMutation({
      fixedCacheKey: "shared-keyword-mutation",
    });
  const [getRelatedDatasetsPostRequest] = useGetRelatedDatasetsMutation({
    fixedCacheKey: "shared-dataset-mutation",
  });

  const [getTimeDatasetPostRequest] = useGetTimeDatasetDataMutation({
    fixedCacheKey: "shared-timedata-mutation",
  });

  const [getTimeKeywordDataPostRequest] = useGetTimeKeywordDataMutation({
    fixedCacheKey: "shared-timekeyworddata-mutation",
  });

  const [getAuthorDataPostRequest, { isLoading: authorIsLoading }] =
    useGetAuthorDataMutation({
      fixedCacheKey: "shared-author-mutation",
    });

  const getRelatedKeywords = async (datasetIDs: IDatasetID[]) => {
    const postRequestBody = { key: datasetIDs };
    try {
      const result = await getRelatedKeywordsPostRequest(
        postRequestBody
      ).unwrap();
      return result;
    } catch (error) {
      // Handle or throw error
      console.error("Failed to fetch related keywords:", error);
      throw error;
    }
  };

  const getRelatedDatasets = async (datasetIDs: IDatasetID[]) => {
    const postRequestBody = { key: datasetIDs };
    try {
      const result = await getRelatedDatasetsPostRequest(
        postRequestBody
      ).unwrap();
      return result;
    } catch (error) {
      // Handle or throw error
      console.error("Failed to fetch related datasets:", error);
      throw error;
    }
  };

  const getTimeDataset = async (range: TemporalCoverage) => {
    const postRequestBody = { start: range.start_date, end: range.end_date };
    try {
      const result = await getTimeDatasetPostRequest(postRequestBody).unwrap();
      return result;
    } catch (error) {
      // Handle or throw error
      console.error("Failed to fetch related datasets:", error);
      throw error;
    }
  };

  const getTimeKeywordData = async (startDate: string, endDate: string) => {
    const postRequestBody = { start: startDate, end: endDate };
    try {
      const result = await getTimeKeywordDataPostRequest(
        postRequestBody
      ).unwrap();
      return result;
    } catch (error) {
      // Handle or throw error
      console.error("Failed to fetch related datasets:", error);
      throw error;
    }
  };

  const getAuthorData = async (datasetIDs: IDatasetID[]) => {
    const postRequestBody = { keys: datasetIDs };
    try {
      const result = await getAuthorDataPostRequest(postRequestBody).unwrap();
      return result;
    } catch (error) {
      // Handle or throw error
      console.error("Failed to fetch author data:", error);
      throw error;
    }
  };

  return {
    getRelatedKeywords,
    getRelatedDatasets,
    getTimeDataset,
    getTimeKeywordData,
    getAuthorData,
    authorIsLoading,
  };
};
