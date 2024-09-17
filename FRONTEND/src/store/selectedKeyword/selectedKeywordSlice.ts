import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IKeywordData } from "types/appData";

export interface ISelectedKeyword {
  selectedKeyword: IKeywordData | null;
}

const initialState: ISelectedKeyword = {
  selectedKeyword: null,
};

// The information regarding selected keyword will be stored in this slice
const SelectedKeywordSlice = createSlice({
  name: "SelectedKeyword",
  initialState,
  reducers: {
    update(state, action: PayloadAction<IKeywordData | null>) {
      state.selectedKeyword = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { update: updateSelectedKeyword, reset: resetSelectedKeyword } =
  SelectedKeywordSlice.actions;

export default SelectedKeywordSlice.reducer;
