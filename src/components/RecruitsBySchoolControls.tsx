import useAllTeams from "@/hooks/useAllTeams";
import { useAppSelector } from "@/lib/hooks";
import {
  Autocomplete,
  Box,
  LinearProgress,
  Slider,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import React, { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";

const autocompleteStyles = (textColor: string): SxProps<Theme> | undefined => {
  return {
    width: "300px", // Ensure a max-width for the autocomplete
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: textColor, // Default border color
      },
      "&:hover fieldset": {
        borderColor: textColor, // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: textColor, // Border color when focused
      },
    },
    "& .MuiOutlinedInput-input": {
      color: textColor, // Text color
    },
    "& .MuiInputLabel-root": {
      color: textColor, // Label color
      "&.Mui-focused": {
        color: textColor, // Label color when focused
      },
    },
    "& .MuiSvgIcon-root": {
      color: textColor, // Dropdown icon color
    },
    "& .MuiAutocomplete-option": {
      color: textColor, // Option text color
    },
    '& .MuiAutocomplete-option[data-focus="true"]': {
      backgroundColor: "rgba(0, 0, 0, 0.08)", // Background color of focused option
      color: textColor, // Text color of focused option
    },
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: "rgba(0, 0, 0, 0.16)", // Background color of selected option
      color: textColor, // Text color of selected option
    },
  };
};

const sliderStyles = (textColor: string): SxProps<Theme> | undefined => {
  return {
    color: textColor,
    "& .MuiSlider-thumb": {
      borderColor: textColor, // Color of the thumb
      "&:hover, &.Mui-focusVisible, &.Mui-active": {
        boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)", // Hover effect
      },
    },
    "& .MuiSlider-track": {
      backgroundColor: textColor, // Color of the track
    },
    "& .MuiSlider-rail": {
      backgroundColor: textColor, // Color of the rail
    },
    "& .MuiSlider-markLabel": {
      color: textColor, // Color of the mark labels
    },
  };
};

const RecruitsBySchoolControls = React.memo(
  function RecruitsBySchoolControls() {
    const {
      data: allTeams,
      loading: allTeamsLoading,
      error: allTeamsError,
    } = useAllTeams();
    const textColor = useAppSelector((state) => state.color.textColor);
    const [sliderValue, setSliderValue] = useState<number[]>([2012, 2024]);

    return (
      <Box
        sx={{
          width: "calc(100% - 20px)",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "85px",
        }}
      >
        {allTeamsLoading && <LinearProgress sx={{ width: "100%" }} />}
        {!allTeamsLoading && allTeamsError && (
          <ErrorIcon sx={{ width: "30px", height: "30px", color: textColor }} />
        )}
        {!allTeamsLoading && !allTeamsError && allTeams && (
          <>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allTeams}
              sx={autocompleteStyles(textColor)}
              renderInput={(params) => <TextField {...params} label="Team" />}
            />
            <Box
              sx={{ width: "60%", marginLeft: "40px", marginBottom: "-28px" }}
            >
              <Slider
                value={sliderValue}
                onChange={(event: Event, newValue: number | number[]) => {
                  setSliderValue(newValue as number[]);
                }}
                min={2000}
                max={2025}
                marks={[
                  { value: 2000, label: "2000" },
                  { value: 2025, label: "2025" },
                ]}
                valueLabelDisplay="on"
                sx={sliderStyles(textColor)}
              />
            </Box>
          </>
        )}
      </Box>
    );
  }
);

export default RecruitsBySchoolControls;
