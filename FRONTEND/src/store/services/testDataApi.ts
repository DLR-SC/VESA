// this is for the query for testdata api

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITestDataObject } from "types/appData";

type response = {
  combinedResult: ITestDataObject[];
};

export const testDataApi = createApi({
  reducerPath: "testDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getTestData: builder.query<ITestDataObject[], void>({
      query: () => {
        return "test";
      },
      transformResponse: (data: response) => {
        return dataCleaner(data?.combinedResult); // cleans the test data to remove null values
      },
    }),
    getTestDataSearch: builder.query<ITestDataObject[], string>({
      query: (searchTerm) => {
        return { url: `test/${searchTerm}` };
      },
      transformResponse: (response: response) => {
        // return response.combinedResult;
        return dataCleaner(response?.combinedResult); // cleans the test data to remove null values
      },
    }),
  }),
});

export const { useGetTestDataQuery, useGetTestDataSearchQuery } = testDataApi;

// test data utils

/** This function cleans data from the testDataAPI to remove null values and normalise the date field and check for type differences */

function dataCleaner(data: any[]): ITestDataObject[] {
  return data
    .filter((item: any) => isDataObject(item))
    .map((item: any) => {
      return {
        ...item,
        date: {
          pub_date: normalizeDate(item.date.pub_date),
        },
      };
    });
}

function isDataObject(obj: any): obj is ITestDataObject {
  return (
    obj &&
    typeof obj === "object" &&
    obj.location &&
    typeof obj.location === "object" &&
    obj.location.lat !== null &&
    obj.location.lon !== null &&
    obj.date &&
    typeof obj.date === "object" &&
    obj.date.pub_date !== null &&
    obj.keyword &&
    typeof obj.keyword === "object" &&
    obj.keyword.keyword !== null &&
    obj.keyword.count !== null
  );
}

const normalizeDate = (dateString: string) => {
  dateString = dateString.toString();
  if (dateString.length === 4) {
    return `${dateString}-01-01`;
  } else if (dateString.length === 7) {
    return `${dateString}-01`;
  }
  return dateString;
};
