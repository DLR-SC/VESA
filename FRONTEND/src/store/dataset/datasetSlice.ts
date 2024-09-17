import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthorData,
  ChordData,
  IDataset,
  IDatasetID,
  IGeoData,
  IKeywordData,
  ITimeData,
} from "types/appData";
import { extractGeoData, toggleSelectedGeoData } from "./utility/utility";

export interface IDatasetSlice {
  dataset: IDataset[];
  keywordData: IKeywordData[];
  geoData: IGeoData[];
  selectedGeoData: IDatasetID[];
  timeData: ITimeData[];
  chordData: ChordData[];
}

const initialState: IDatasetSlice = {
  dataset: [],
  keywordData: [],
  geoData: [],
  selectedGeoData: [],
  timeData: [],
  chordData: [],
};

const DatasetSlice = createSlice({
  name: "Dataset",
  initialState,
  reducers: {
    setDataset(state, action: PayloadAction<IDataset[]>) {
      state.dataset = action.payload;
    },
    setKeywordData(state, action: PayloadAction<IKeywordData[]>) {
      state.keywordData = action.payload;
    },
    setGeoData(state, action: PayloadAction<IDataset[]>) {
      state.geoData = extractGeoData(action.payload);
    },
    updateSelectedGeoData(state, action: PayloadAction<IDatasetID>) {
      state.selectedGeoData = toggleSelectedGeoData(
        state.selectedGeoData,
        action.payload
      );
    },
    setSelectedGeoData(state, action: PayloadAction<IDatasetID[]>) {
      state.selectedGeoData = action.payload;
    },
    setTimeData(state, action: PayloadAction<ITimeData[]>) {
      state.timeData = action.payload;
    },
    setChordData(state, action: PayloadAction<ChordData[]>) {
      state.chordData = action.payload.slice(0,100); // adding a cap of 100 to limit initial node link diagram chart
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  setDataset,
  setKeywordData,
  setGeoData,
  updateSelectedGeoData,
  reset: resetDatasetSlice,
  setSelectedGeoData,
  setTimeData,
  setChordData,
} = DatasetSlice.actions;

export default DatasetSlice.reducer;
