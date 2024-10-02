import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IDatasetID,
  IDataset,
  IKeywordData,
  TemporalCoverage,
} from "types/appData";

type DatasetResponse = {
  result: IDataset[];
};
interface IAuthorResponse {
  author: string;
  datasets: IDatasetID[];
}
type AuthorDataResponse = {
  result: IAuthorResponse[];
};

type KeywordDataResponse = {
  result: IKeywordData[];
};

type postDataRequestType = {
  key: IDatasetID[];
};

type postAuthorDataRequestType = {
  keys: IDatasetID[];
};

type postTimeDataRequestType = {
  start: TemporalCoverage["start_date"];
  end: TemporalCoverage["end_date"];
};

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    // API end point for getting initial data
    getInitialDatasets: builder.query<DatasetResponse, void>({
      query: () => {
        return "main/all";
      },
    }),
    // API endpoint for getting initial KEYWORD data
    getInitialKeywordData: builder.query<KeywordDataResponse, void>({
      query: () => {
        return "keywords/all";
      },
    }),
    // API endpoint for getting related KEYWORD data
    getRelatedKeywordData: builder.mutation<
      KeywordDataResponse,
      postDataRequestType
    >({
      query: (req) => {
        return { url: "keywords/", method: "POST", body: req };
      },
    }),
    // API endpoint for getting related datasets from selected keyword
    getRelatedDatasets: builder.mutation<DatasetResponse, postDataRequestType>({
      query: (req) => {
        return { url: "main/", method: "POST", body: req };
      },
    }),
    getTimeDatasetData: builder.mutation<
      DatasetResponse,
      postTimeDataRequestType
    >({
      query: (req) => {
        return { url: "time/main", method: "POST", body: req };
      },
    }),
    getTimeKeywordData: builder.mutation<
      DatasetResponse,
      postTimeDataRequestType
    >({
      query: (req) => {
        return { url: "time/keywords", method: "POST", body: req };
      },
    }),
    getInitialAuthorData: builder.query<AuthorDataResponse, void>({
      query: () => {
        return "author/all";
      },
    }),
    getAuthorData: builder.mutation<
      AuthorDataResponse,
      postAuthorDataRequestType
    >({
      query: (req) => {
        return { url: "author/", method: "POST", body: req };
      },
    }),
  }),
});

export const {
  useGetInitialDatasetsQuery,
  useGetInitialKeywordDataQuery,
  useGetRelatedKeywordDataMutation,
  useGetRelatedDatasetsMutation,
  useGetTimeDatasetDataMutation,
  useGetTimeKeywordDataMutation,
  useGetInitialAuthorDataQuery,
  useGetAuthorDataMutation,
} = dataApi;
