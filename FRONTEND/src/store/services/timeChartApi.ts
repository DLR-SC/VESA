// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { ITimeData } from "types/appData";

// // this is the response type of wrdcloud endpoint from backend. This should go into types section
// type response = {
//   publications: IWordCloudData[];
// };

// export const wordCloudApi = createApi({
//   reducerPath: "wordCloudApi",
//   baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3001/` }),
//   endpoints: (builder) => ({
//     getWordCloudData: builder.query<ITimeData[], void>({
//       query: () => {
//         return "timechart/";
//       },
//       // temporarily converting data at the server side itself.
//       // transformResponse: (response: response) => {
//       //   /** Obtaining wordcount from the array to transform in to {text,value} pair to generate WordCloud */
//       //   const lowercaseArray = response.publications
//       //     .flat()
//       //     .map((element) => element.toLowerCase());

//       //   const countMap: { [key: string]: number } = lowercaseArray.reduce(
//       //     (acc: { [key: string]: number }, element) => {
//       //       acc[element] = (acc[element] || 0) + 1;
//       //       return acc;
//       //     },
//       //     {}
//       //   );

//       //   const countArray: IWordCloudData[] = Object.entries(countMap)
//       //     // .filter(([text, value]) => value > 1)
//       //     .map(([text, value]) => ({ text, value }));

//       //   return countArray;
//       // },
//     }),
//     getWordCloudString: builder.query<string, void>({
//       query: () => "wordcloud/",
//       transformResponse: (response: response) => {
//         /** Obtaining wordcount from the array to
//          *  transform in to {text,value} pair to generate WordCloud */
//         return response.publications.flat().join("");
//       },
//     }),
//   }),
// });

// export const updateWordCloud = (filter: number) =>
//   wordCloudApi.util.updateQueryData("getWordCloudData", undefined, (drafts) =>
//     drafts.filter((item) => item.year === filter)
//   );

// export const { useGetWordCloudDataQuery, useGetWordCloudStringQuery } =
//   wordCloudApi;
export {};
