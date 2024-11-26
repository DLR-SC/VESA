import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  realignMode: boolean;
}

const initialState: UIState = {
  realignMode: false,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRealignMode(state, action: PayloadAction<boolean>) {
      state.realignMode = action.payload;
    },
  },
});

export const { setRealignMode } = UISlice.actions;
export default UISlice.reducer;
