"use client";
import { Box, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import RecruitsBySchoolControls from "./RecruitsBySchoolControls";
import RecruitsBySchoolVisualization from "./RecruitsBySchoolVisualization";
import { getCurrentYear } from "@/utils/dateUtils";
import { setSchoolFilters } from "@/lib/typographySlice";

export default function RecruitsBySchool() {
  const paperColor = useAppSelector((state) => state.color.paperColor);
  const textColor = useAppSelector((state) => state.color.textColor);
  const title = useAppSelector((state) => state.typography.title);
  const [schoolName, setSchoolName] = useState<string>("");
  const currentYear = getCurrentYear();
  const [yearRange, setYearRange] = useState<number[]>([
    currentYear - 1,
    currentYear,
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setSchoolFilters({
        schoolName,
        yearStart: yearRange[0],
        yearEnd: yearRange[1],
      })
    );
  }, [schoolName, yearRange, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 60px)",
        justifyContent: { xl: "start", xs: "space-between" },
      }}
    >
      <Paper
        sx={{
          backgroundColor: paperColor,
          "& p": {
            color: textColor,
          },
          paddingBottom: "10px",
          boxShadow: "5px 5px 10px -5px black",
        }}
      >
        <Typography
          sx={{
            fontSize: "calc(min(28px, 5vw))",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <RecruitsBySchoolVisualization
          schoolName={schoolName}
          yearStart={yearRange[0]}
          yearEnd={yearRange[1]}
        />
      </Paper>
      <Paper
        sx={{
          marginTop: "10px",
          boxShadow: "5px 5px 10px -5px black",
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
