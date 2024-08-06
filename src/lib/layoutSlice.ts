import { createSlice } from "@reduxjs/toolkit";

interface LayoutState {
  drawerOpen: boolean;
}

const initialState: LayoutState = {
  drawerOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen
    },
  },
});

export const { toggleDrawer } = layoutSlice.actions;
export default layoutSlice.reducer;
