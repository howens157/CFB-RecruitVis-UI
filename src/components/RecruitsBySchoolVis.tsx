"use client";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import RecruitsBySchoolControls from "./RecruitsBySchoolControls";
import RecruitsBySchoolVisualization from "./RecruitsBySchoolVisualization";
import { getCurrentYear } from "@/utils/dateUtils";

//TODO: rename to just RecruitsBySchool
export default function RecruitsBySchoolVis() {
  const paperColor = useAppSelector((state) => state.color.paperColor);
  const textColor = useAppSelector((state) => state.color.textColor);
  const title = useAppSelector((state) => state.typography.title);
  const [schoolName, setSchoolName] = useState<string>("");
  const currentYear = getCurrentYear();
  const [yearRange, setYearRange] = useState<number[]>([
    currentYear - 1,
    currentYear,
  ]);

  return (
    <Box display="flex" flexDirection="column">
      <h6>{schoolName}</h6>
      <h6>{JSON.stringify(yearRange)}</h6>
      <Paper
        sx={{
          backgroundColor: paperColor,
          "& p": {
            color: textColor,
          },
        }}
      >
        <Grid
          container
          sx={{
            padding: "10px",
          }}
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "calc(min(28px, 5vw))",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
          </Grid>
          <RecruitsBySchoolVisualization
            schoolName={schoolName}
            yearStart={yearRange[0]}
            yearEnd={yearRange[1]}
          />
        </Grid>
      </Paper>
      <Paper
        sx={{
          marginTop: "10px",
          backgroundColor: paperColor,
          "& p": {
            color: textColor,
          },
        }}
      >
        <RecruitsBySchoolControls 
          searchState={[schoolName, setSchoolName]}
          sliderState={[yearRange, setYearRange]}
        />
      </Paper>
    </Box>
  );
}
