import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

const crossFilterSelector = (state: RootState) => state.crossFilters;

export const getTestData = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.testData
);

export const getLocationData = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.locationData
);

export const getKeywordData = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.keywordData
);

export const getDateData = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.dateData
);

export const getGeoChartFilter = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.geoChartFilter
);

export const getTimeChartFilter = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.timeChartFilter
);

export const getTableData = createSelector(
  crossFilterSelector,
  (crossFilter) => crossFilter.tableData
);
