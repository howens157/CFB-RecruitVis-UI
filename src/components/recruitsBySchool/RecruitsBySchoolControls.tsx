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
import { getCurrentYear } from "@/utils/dateUtils";

const autocompleteStyles = (textColor: string): SxProps<Theme> | undefined => {
  return {
    width: {
      lg: "300px",
      xs: "70vw",
    }, // Ensure a max-width for the autocomplete
    marginTop: {
      lg: 0,
      xs: '10px'
    },
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

const sliderStyles = (
  textColor: string,
  backgroundColor: string
): SxProps<Theme> | undefined => {
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
    "& .MuiSlider-valueLabel": {
      backgroundColor: backgroundColor, // Background color of the value label
      color: textColor, // Color of the value label text
      borderRadius: "4px", // Optional: Add border radius for better appearance
      "& *": {
        background: "transparent", // Remove the default background color
      },
    },
  };
};

type ControlType = {
  searchState: [string, React.Dispatch<React.SetStateAction<string>>];
  sliderState: [number[], React.Dispatch<React.SetStateAction<number[]>>];
};

const RecruitsBySchoolControls = ({
  searchState: [searchVal, setSearchVal],
  sliderState: [sliderVal, setSliderVal],
}: ControlType) => {
  const {
    data: allTeams,
    loading: allTeamsLoading,
    error: allTeamsError,
  } = useAllTeams();
  const [localSliderVal, setLocalSliderVal] = useState<number[]>(sliderVal);
  const { textColor, backgroundColor } = useAppSelector((state) => state.color);
  const currentYear = getCurrentYear();

  return (
    <Box
      sx={{
        width: "calc(100% - 20px)",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "85px",
        flexDirection: {
          lg: "row",
          xs: "column-reverse",
        },
        paddingTop: {
          lg: "10px",
          xs: "40px",
        },
      }}
    >
      {allTeamsLoading && <LinearProgress sx={{ width: "100%" }} />}
      {!allTeamsLoading && allTeamsError && (
        <ErrorIcon sx={{ width: "30px", height: "30px", color: textColor }} />
      )}
      {!allTeamsLoading && !allTeamsError && allTeams && (
        <>
          <Autocomplete
            disableClearable
            options={allTeams}
            value={searchVal}
            onChange={(e, v) => {
              setSearchVal(v as string);
            }}
            sx={autocompleteStyles(textColor)}
            renderInput={(params) => <TextField {...params} label="Team" />}
          />
          <Box
            sx={{
              width: {
                lg: "60%",
                xs: "90%",
              },
              marginLeft: {lg: "40px", xs: '30px'},
              marginBottom: "-28px",
              marginRight: "30px",
            }}
          >
            <Slider
              value={localSliderVal}
              onChange={(
                event: Event | React.SyntheticEvent<Element, Event>,
                newValue: number | number[]
              ) => {
                setLocalSliderVal(newValue as number[]);
              }}
              onChangeCommitted={(
                event: Event | React.SyntheticEvent<Element, Event>,
                newValue: number | number[]
              ) => {
                setSliderVal(newValue as number[]);
              }}
              min={2000}
              max={currentYear}
              marks={[
                { value: 2000, label: "2000" },
                { value: currentYear, label: `${currentYear}` },
              ]}
              valueLabelDisplay="on"
              sx={sliderStyles(textColor, backgroundColor)}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default RecruitsBySchoolControls;
