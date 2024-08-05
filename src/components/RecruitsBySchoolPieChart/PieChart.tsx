import { Box, Typography } from "@mui/material";
import nd_recruit_info from "@/static/nd_recruit_info.json";
import { useState, useEffect } from "react";
import PieSections from "./PieSections";
import PieLegend from "./PieLegend";
import { scaleOrdinal, schemeSet3 } from "d3";
import { PlayerStateDataType, SchoolDataType } from "@/types/recruitTypes";
import PieSkeleton from "./PieSkeleton";
import { useAppSelector } from "@/lib/hooks";

type PieChartProps = {
  schoolData: SchoolDataType | null;
  loading: boolean;
};

const aggregateStatesToTop5 = (data: SchoolDataType | null) => {
  if(data == null) {
    return null
  }
  const top5StatesAggregated = data.playerData.slice(0, 5);
  let sumOtherStates = 0;
  for (let i = 5; i < data.playerData.length; i++) {
    sumOtherStates += data.playerData[i].count;
  }

  if (sumOtherStates > 0) {
    top5StatesAggregated.push({ state_name: "Other", count: sumOtherStates });
  }

  return top5StatesAggregated;
};

export default function PieChart({schoolData, loading}: PieChartProps) {
  let colorScale = scaleOrdinal(schemeSet3);
  const aggregatedPlayerData = aggregateStatesToTop5(schoolData);
  const pieTitle = useAppSelector((state) => state.typography.pieTitle);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: {
          xs: "400px", // below md breakpoint
          md: "600px", // above md breakpoint
        },
        marginTop: {
          xl: "0px",
          lg: "-100px",
          md: "-200px",
          sm: "-210px",
          xs: "-270px",
        },
      }}
    >
      <svg viewBox="0 0 500 600">
        {(!loading && aggregatedPlayerData != null) ? <>
          <PieSections
            playerData={aggregatedPlayerData}
            colorScale={colorScale}
          />
          <PieLegend playerData={aggregatedPlayerData} colorScale={colorScale} />
        </> :
        <PieSkeleton/>
        }
      </svg>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
          marginTop: {
            xs: "-50px",
            md: "-15px",
          },
        }}
      >
        {pieTitle}
      </Typography>
    </Box>
  );
}
