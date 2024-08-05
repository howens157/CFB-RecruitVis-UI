import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorState {
  backgroundColor: string;
  paperColor: string;
  textColor: string;
}

const initialState: ColorState = {
  backgroundColor: "#333333", // default white color
  paperColor: "#5b5b5b",
  textColor: "white"
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const { setBackgroundColor } = colorSlice.actions;
export default colorSlice.reducer;
