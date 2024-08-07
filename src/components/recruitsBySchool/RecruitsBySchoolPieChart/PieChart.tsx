import { Box, Typography } from "@mui/material";
// import PieSections from "./PieSections";
// import PieLegend from "./PieLegend";
import { SchoolDataType } from "@/types/recruitTypes";
import PieSkeleton from "./PieSkeleton";
import { scaleLinear, scaleOrdinal, schemeTableau10 } from "d3";
import { useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";
import { colorDistance, hexToRgb } from "@/utils/colorUtils";
const PieSections = dynamic(() => import("./PieSections"));
const PieLegend = dynamic(() => import("./PieLegend"));

type PieChartProps = {
  schoolData: SchoolDataType | null;
};

const aggregateStatesToTop5 = (data: SchoolDataType | null) => {
  if (data == null) {
    return null;
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

export default function PieChart({ schoolData }: PieChartProps) {
  const { color, altColor } = useAppSelector((state) => state.color);
  const pieTitle = useAppSelector((state) => state.typography.pieTitle);

  // let colorScale = scaleOrdinal(schemeSet3);
  let colorScale;
  const aggregatedPlayerData = aggregateStatesToTop5(schoolData);

  if (colorDistance(hexToRgb(color), hexToRgb(altColor)) > 300) {
    const lengthData = aggregatedPlayerData?.length;

    const colors: string[] = [];
    const linearScale = scaleLinear([0, lengthData || 1], [color, altColor]);
    for (let i = 0; i < (lengthData || 1); i++) {
      colors.push(linearScale(i));
    }
    colorScale = scaleOrdinal(colors)
  }
  else {
    colorScale = scaleOrdinal(schemeTableau10);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: {
          xl: "100%",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xl: "calc(min(500px, 30vw))",
            xs: "50vw",
          },
          height: {
            xl: "550px",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg viewBox="0 0 500 400" style={{ width: "100%" }}>
          {aggregatedPlayerData != null ? (
            <>
              <PieSections
                playerData={aggregatedPlayerData}
                colorScale={colorScale}
              />
              <PieLegend
                playerData={aggregatedPlayerData}
                colorScale={colorScale}
              />
            </>
          ) : (
            <PieSkeleton />
          )}
        </svg>
      </Box>
      <Typography
        sx={{
          fontSize: "calc(min(18px, 4vw))",
          fontWeight: {
            xs: "500",
            md: "700",
          },
          textAlign: "center",
        }}
      >
        {pieTitle}
      </Typography>
    </Box>
  );
}
