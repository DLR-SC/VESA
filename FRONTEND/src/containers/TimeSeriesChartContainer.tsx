// import { CircularProgress } from "@mui/material";
// import TimeSeriesChart from "../chartHooks/TimeSeriesChart";
// import React from "react";
// import { getDateData } from "../store/crossfilters/crossFilterSelectors";
// import { setTimeSeriesFilter } from "../store/crossfilters/crossFilterSlice";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { useGetTestDataQuery } from "../store/services/testDataApi";
// import { TimeChartFilter } from "../types/appData";
// import { debouncedDispatch } from "../utils/app-utils";
// import EmptyDatasetCard from "../components/EmptyDatasetCard";

// const TimeSeriesChartContainer = (): JSX.Element => {
//   const [timeFilter, setTimeFilter] = React.useState<TimeChartFilter>({});
//   const dateData = useAppSelector(getDateData);
//   const { isFetching } = useGetTestDataQuery();

//   const dispatch = useAppDispatch();

//   React.useEffect(() => {
//     const cleanupDebouncedDispatch = debouncedDispatch(
//       dispatch,
//       setTimeSeriesFilter(timeFilter),
//       300 //debounce time
//     );

//     return cleanupDebouncedDispatch;
//   }, [timeFilter, dispatch]);

//   // this function handles the timeseries filter change. The filter being the start and end date of the dataset in view.
//   const handleFilter = React.useCallback(
//     (key: keyof TimeChartFilter, date: number) => {
//       setTimeFilter((prevFilter) => ({
//         ...prevFilter,
//         [key]: date,
//       }));
//     },
//     []
//   );

//   if (isFetching) {
//     return <CircularProgress />;
//   }

//   return dateData.length ? (
//     <TimeSeriesChart data={dateData} handleFilter={handleFilter} />
//   ) : (
//     <EmptyDatasetCard />
//   );
// };

// export default TimeSeriesChartContainer;
export {};
