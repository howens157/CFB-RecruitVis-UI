import {
  hexToRgb,
  lightenColor,
  rgbToString,
  capSaturationAndBrightness,
} from "@/utils/colorUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorState {
  color: string;
  backgroundColor: string;
  paperColor: string;
  altColor: string;
  textColor: string;
  navColor: string;
}

const initialState: ColorState = {
  color: "white",
  backgroundColor: "#333333",
  paperColor: "#5b5b5b",
  altColor: "white",
  textColor: "white",
  navColor: "#222222",
};

type SchoolColors = {
  color: string;
  altColor: string;
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<SchoolColors>) => {
      const { color, altColor } = action.payload;
      if (color && altColor) {
        const navColor = hexToRgb(color);
        const backgroundColor = lightenColor(navColor, 20);
        const paperColor = lightenColor(backgroundColor, 30);

        const cappedNavColor = capSaturationAndBrightness(navColor, 30, 20);
        const cappedBackgroundColor = capSaturationAndBrightness(
          backgroundColor,
          40,
          25
        );
        const cappedPaperColor = capSaturationAndBrightness(paperColor, 30, 40);

        state.navColor = rgbToString(cappedNavColor);
        state.backgroundColor = rgbToString(cappedBackgroundColor);
        state.paperColor = rgbToString(cappedPaperColor);
        state.textColor = 'white';
        state.altColor = altColor;
        state.color = color
      } else {
        state.backgroundColor = initialState.backgroundColor;
        state.paperColor = initialState.paperColor;
        state.altColor = initialState.altColor;
        state.textColor = initialState.textColor;
        state.navColor = initialState.navColor;
      }
    },
  },
});

export const { setColors } = colorSlice.actions;
export default colorSlice.reducer;
