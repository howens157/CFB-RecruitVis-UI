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
  pieTitle: "Most Recruited States",
};

const typographySlice = createSlice({
  name: "typography",
  initialState,
  reducers: {
    setSchoolFilters: (state, action: PayloadAction<RecruitsFilter>) => {
      const { schoolName, yearStart, yearEnd } = action.payload;
      if (!schoolName) {
        state.title = initialState.title;
        state.mapTitle = initialState.mapTitle;
        state.pieTitle = initialState.pieTitle;
      } else {
        state.mapTitle = `Geographic Distribution of ${schoolName} Recruits`;
        state.pieTitle = `${schoolName} Most Recruited States`;
        if (yearEnd > yearStart) {
          state.title = `${schoolName} Recruiting Breakdown ${yearStart} - ${yearEnd}`;
        } else {
          state.title = `${schoolName} Recruiting Breakdown ${yearEnd}`;
        }
      }
    },
  },
});

export const { setSchoolFilters } = typographySlice.actions;
export default typographySlice.reducer;
