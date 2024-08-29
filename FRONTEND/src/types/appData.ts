import crossfilter from "crossfilter2";

export interface AppState {
  searchString: string | null;
  handleSearch: (value: string) => void;
}

export type Props = {
  children: React.ReactNode;
};

export interface ISampleData {
  _key: string;
  _id: string;
  _rev: string;
  keyword_full: string;
  timestamp: string;
}

//this is the interface for the wordcloud data to be transformed into
export interface IWordCloudData {
  text: string;
  value: number;
  year: number; //temp
}

//test data interface

export interface ILocation {
  lat: string;
  lon: string;
}

interface DateInfo {
  pub_date: string;
}

// This is the interface for the incoming test data for bar charts
export interface Keyword {
  keyword: string;
  count: number;
}

// This is the interface for the incoming test data for geo charts
export interface Coordinates {
  coordinates: number[];
}

// This is the interface for the incoming test data for time series charts
export interface TimeSeries {
  date: string;
  count: number;
}

// This is the interface for the transformed test data for time series charts
export interface TimeSeriesTransformed {
  date: number;
  count: number;
}

export interface ITestDataObject {
  location: ILocation;
  date: DateInfo;
  keyword: Keyword;
}

export type CrossfilterType = crossfilter.Crossfilter<ITestDataObject> | null;

export type CrossfilterGroup = crossfilter.Grouping<
  crossfilter.NaturallyOrderedValue,
  unknown
>;

export type CrossfilterDimensionString = crossfilter.Dimension<
  ITestDataObject,
  string
>;

export type CrossfilterDimensionNumber = crossfilter.Dimension<
  ITestDataObject,
  number
>;

export type TimeChartFilter = {
  min?: number;
  max?: number;
};

export type GeoChartFilter = number[] | [];

export type Filters = {
  filterType: "TIME" | "GEO";
  timeFilter?: TimeChartFilter;
  geoFilter?: GeoChartFilter;
};

export interface IUpdateDimensionPayload {
  filter: Filters;
  testData: ITestDataObject[];
}

export interface DimensionsObject {
  locationDimension: CrossfilterDimensionNumber;
  dateDimension: CrossfilterDimensionNumber;
  keywordDimension: CrossfilterDimensionString;
}

/** All action types and corresponding payload types are to be defined here */
type UpdateSearch = { type: "UPDATE_SEARCH"; payload: string };

/** The AppActions type would be the union of all above menioned types */
export type AppActions = UpdateSearch;

export interface Action {
  type: string | null;
  payload?: any;
}

export const initialState: AppState = {
  searchString: null,
  handleSearch: () => {},
};

export interface TemporalCoverage {
  start_date: string | null;
  end_date: string | null;
}

interface LocationData {
  west_bound_longitude: `${number}` | null;
  east_bound_longitude: `${number}` | null;
  north_bound_longitude: `${number}` | null;
  south_bound_longitude: `${number}` | null;
  mean_latitude: `${number}` | null;
  mean_longitude: `${number}` | null;
}

export interface IDataset {
  id: IDatasetID;
  location_data: LocationData;
  doi: IDoi;
  dataset_publication_date?: IPublicationDate;
  temporal_coverage: TemporalCoverage | null;
  authors?: IAuthor[];
  providers?: IProvider[];
  dataset_title: ITitle;
  organization: "PANGAEA" | "Earth Observatory";
}

//Dataset attributes
export type IDatasetID =
  | `Dataset/${IDatasetKEY}`
  | `STACCollection/${IDatasetKEY}`;
export type IDatasetKEY = number | string;
export type IAbstract = string | null;
export type ITitle = string | null;
export type IAuthor = string | null;
export type IProvider = string | null;
export type IDoi = string | null;
export type IPublicationDate = string | null;

export interface IKeywordData {
  keyword: string;
  count: number;
  dataset_id: IDatasetID[];
}

export interface IGeoData {
  id: IDatasetID;
  coordinates: [
    lat: LocationData["mean_latitude"],
    lon: LocationData["mean_longitude"]
  ];
  groupId: "dataset" | "staccollection" | "active";
}

export interface ITransformedTimeData {
  start: string;
  end: string;
  dataset_title: ITitle;
}
export interface ITimeData {
  date: number | string;
  value: number;
}

export interface AuthorData {
  author: string;
  datasets: IDatasetID[];
}

export interface ChordData {
  from: string;
  to: string;
  value: number;
}

export interface IPointHoverHandler {
  (lat: string, lon: string): void;
}

export interface IContainerProps {
  // height: string;
}
