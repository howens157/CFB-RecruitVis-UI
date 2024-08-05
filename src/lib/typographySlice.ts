import { RecruitsFilter } from "@/types/recruitTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypographyState {
  title: string;
  mapTitle: string;
  pieTitle: string;
}

const initialState: TypographyState = {
  title: "Select a School to Get Started!", // default white color
  mapTitle: "Geographic Distribution of Recruits",
  pieTitle: "Most Recruited States"
};

const typographySlice = createSlice({
  name: "typography",
  initialState,
  reducers: {
    setSchoolFilters: (state, action: PayloadAction<RecruitsFilter>) => {
      state.title = action.payload.schoolName;
      state.mapTitle = action.payload.schoolName;
      state.pieTitle = action.payload.schoolName;
    },
  },
});

export const { setSchoolFilters } = typographySlice.actions;
export default typographySlice.reducer;
