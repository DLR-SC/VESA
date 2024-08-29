/** Util functions for all crossFilterSlice related operations */

import crossfilter from "crossfilter2";
import _ from "lodash";
import {
  CrossfilterDimensionNumber,
  CrossfilterDimensionString,
  CrossfilterGroup,
  DimensionsObject,
  Filters,
  ITestDataObject,
} from "types/appData";
import { IFilterSlice } from "./crossFilterSlice";

const showLimit = 500; //no of data to to be shown

// Function to create dimensions for location, keyword, and date
export const createDimensions = (data: ITestDataObject[]): DimensionsObject => {
  const cx = crossfilter(data);

  const locationDimension = cx.dimension((d) => [
    parseFloat(d.location.lat),
    parseFloat(d.location.lon),
  ]);

  const dateDimension = cx.dimension((d) =>
    new Date(d.date.pub_date).getTime()
  );

  const keywordDimension = cx.dimension((d) => d.keyword.keyword);

  return {
    locationDimension,
    dateDimension,
    keywordDimension,
  };
};

// Function to apply a time chart filter to the dimensions
export const applyFilter = (
  dimensions: DimensionsObject,
  state: IFilterSlice,
  filter?: Filters
): DimensionsObject => {
  if (!filter) return dimensions;

  const { dateDimension, locationDimension } = dimensions;
  const max = filter.timeFilter?.max;
  const min = filter.timeFilter?.min;

  const geoFilter = filter.geoFilter;

  if (min && max) {
    dateDimension.filterRange([min, max]);
  }

  if (!_.isEmpty(geoFilter)) {
    locationDimension.filter((d: any) => {
      return _.isEqual(d, geoFilter);
    });

    // const dateDataUnderGeoFilter = createDateDimensionAndExtractData(
    //   dateDimension.top(Infinity)
    // );
    // state.timeChartFilter = findMinMaxDateWithBuffer(dateDataUnderGeoFilter);
  }

  const filteredData = dateDimension.top(Infinity);
  return createDimensions(filteredData);
};

// this function is for creating a date dimension and getting data to be used for setting geo filter
const createDateDimensionAndExtractData = (data: ITestDataObject[]) => {
  const cx = crossfilter(data);

  const dateDimension = cx.dimension((d) =>
    new Date(d.date.pub_date).getTime()
  );

  return extractDateDimensionData(dateDimension);
};

const findMinMaxDateWithBuffer = (
  dateData: CrossfilterGroup[],
  bufferDays = 10
) => {
  const minKey = (dateData[0].key as number) - bufferDays * 24 * 60 * 60 * 1000; // Subtract bufferDays from the first element
  const maxKey =
    (dateData[dateData.length - 1].key as number) +
    bufferDays * 24 * 60 * 60 * 1000; // Add bufferDays to the last element

  return { min: minKey, max: maxKey };
};
// Function to extract keyword data from the keyword dimension
export const extractKeywordDimensionData = (
  keywordDimension: CrossfilterDimensionString
): CrossfilterGroup[] => {
  const keywordGroup = keywordDimension
    .group()
    .reduceSum((d) => d.keyword.count);

  return keywordGroup.top(showLimit);
};

// Function to extract date data from the date dimension
export const extractDateDimensionData = (
  dateDimension: CrossfilterDimensionNumber
): CrossfilterGroup[] => {
  const dateGroup = dateDimension.group().reduceCount();
  return dateGroup.top(Infinity).sort((a: any, b: any) => a.key - b.key);
};

// Function to extract location data from the location dimension
export const extractLocationDimensionData = (
  locationDimension: CrossfilterDimensionNumber
): CrossfilterGroup[] => {
  const locationGroup = locationDimension.group();
  return locationGroup.top(showLimit);
};
