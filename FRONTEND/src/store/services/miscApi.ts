import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGeoData, IDatasetID } from "types/appData";

type abstractResponse = {
  result: [string];
};
type abstractRequestType = {
  key: IDatasetID;
};
type locationNameResponse = {
  locationName: string | null;
};
type locationNameRequestType = {
  lat: IGeoData["coordinates"][1];
  lon: IGeoData["coordinates"][0];
};

export const miscApi = createApi({
  reducerPath: "miscApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    timeout: 15000,
  }),
  endpoints: (builder) => ({
    getAbstract: builder.mutation<abstractResponse, abstractRequestType>({
      query: (req) => {
        return { url: "abstract/", method: "POST", body: req };
      },
    }),
    getLocationName: builder.mutation<
      locationNameResponse,
      locationNameRequestType
    >({
      query: (req) => {
        return { url: "locname/", method: "POST", body: req };
      },
    }),
  }),
});

export const { useGetAbstractMutation, useGetLocationNameMutation } = miscApi;
