import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  CrossfilterGroup,
  Filters,
  GeoChartFilter,
  ITestDataObject,
  IUpdateDimensionPayload,
  TimeChartFilter,
} from "types/appData";
import {
  applyFilter,
  createDimensions,
  extractDateDimensionData,
  extractKeywordDimensionData,
  extractLocationDimensionData,
} from "./crossFilterUtility";

export interface IFilterSlice {
  testData: ITestDataObject[];
  tableData: ITestDataObject[];
  locationData: CrossfilterGroup[];
  dateData: CrossfilterGroup[];
  keywordData: CrossfilterGroup[];
  timeChartFilter: TimeChartFilter; // this can have the min and max date for filtering by time
  geoChartFilter: GeoChartFilter; // this will either be an empty array or array of type Coordinates to denote the selected geo location
}

const initialState: IFilterSlice = {
  testData: [],
  tableData: [],
  locationData: [],
  dateData: [],
  keywordData: [],
  timeChartFilter: {},
  geoChartFilter: [],
};

const CrossFilterSlice = createSlice({
  name: "CrossFilter",
  initialState,
  reducers: {
    // This reducer is for setting the fetched data into the redux store
    setTestData(state, action: PayloadAction<ITestDataObject[]>) {
      state.testData = action.payload;
    },

    // This reducer is for updating the required datasets for each chart with the testData from the store
    setData(state, action: PayloadAction<ITestDataObject[]>) {
      insertData(state, action.payload);
    },

    setTimeSeriesFilter(state, action: PayloadAction<TimeChartFilter>) {
      state.timeChartFilter = action.payload;
    },
    setGeoPointFilter(state, action: PayloadAction<GeoChartFilter>) {
      const isSameAsCurrent = action.payload === current(state.geoChartFilter); // checking for deselection
      state.geoChartFilter = isSameAsCurrent ? [] : action.payload;
    },
    updateDimensions(state, action: PayloadAction<IUpdateDimensionPayload>) {
      updateData(state, action.payload.testData, action.payload.filter);
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  setTestData,
  setData,
  setTimeSeriesFilter,
  updateDimensions,
  reset: crossFilterReset,
  setGeoPointFilter,
} = CrossFilterSlice.actions;

const insertData = (
  state: IFilterSlice,
  data: ITestDataObject[],
  filter?: Filters
) => {
  if (!data) return;

  let dimensions = createDimensions(data);
  // dimensions = applyFilter(dimensions, filter) as DimensionsObject;

  if (dimensions) {
    state.tableData = dimensions.keywordDimension.top(Infinity);
    state.keywordData = extractKeywordDimensionData(
      dimensions.keywordDimension
    );
    state.locationData = extractLocationDimensionData(
      dimensions.locationDimension
    );
    state.dateData = extractDateDimensionData(dimensions.dateDimension);
  }
};

const updateData = (
  state: IFilterSlice,
  data: ITestDataObject[],
  filter?: Filters
) => {
  if (!data) return;

  let dimensions = createDimensions(data);
  dimensions = applyFilter(dimensions, state, filter);

  if (_.isEmpty(dimensions.keywordDimension.top(Infinity))) return;

  if (dimensions) {
    state.tableData = dimensions.keywordDimension.top(Infinity); // this updates the table state
    state.keywordData = extractKeywordDimensionData(
      dimensions.keywordDimension
    );
    if (filter?.filterType === "TIME" && _.isEmpty(filter?.geoFilter))
      state.locationData = extractLocationDimensionData(
        dimensions.locationDimension
      );
    if (filter?.filterType === "GEO")
      state.dateData = extractDateDimensionData(dimensions.dateDimension);
  }
};

export default CrossFilterSlice.reducer;
