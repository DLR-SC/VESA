import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";
import { chartsDefaultLayout } from "../../data/chartsDefaultLayout";

interface UIState {
  realignMode: boolean;
  gridLayout: Layout[];
}

const initialState: UIState = {
  realignMode: false,
  gridLayout: chartsDefaultLayout,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRealignMode(state, action: PayloadAction<boolean>) {
      state.realignMode = action.payload;
    },
    updateGridLayout(state, action: PayloadAction<Layout[]>) {
      state.gridLayout = action.payload;
    },
    resetLayout(state) {
      state.gridLayout = chartsDefaultLayout;
    },
  },
});

export const { setRealignMode, updateGridLayout, resetLayout } =
  UISlice.actions;
export default UISlice.reducer;
