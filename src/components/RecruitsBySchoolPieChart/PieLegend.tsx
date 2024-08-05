import { PlayerStateDataType } from "@/types/recruitTypes";
import { Typography, useTheme } from "@mui/material";
import { ScaleOrdinal } from "d3";
import React from "react";

type PieLegendPropType = {
  colorScale: ScaleOrdinal<string, string, never>;
  playerData: PlayerStateDataType[];
};

export default function PieLegend(props: PieLegendPropType) {
  const { colorScale, playerData } = props;
  const theme = useTheme(); // Access the MUI theme

  return (
    <>
      {playerData.map((state, i) => (
        <React.Fragment key={`${state.state_name}_legend`}>
          <rect
            x={380}
            y={230 + 25 * i}
            width={20}
            height={20}
            fill={colorScale(state.state_name)}
            stroke="black"
            strokeWidth={3}
          />
          <rect
            x={400}
            y={230 + 25 * i}
            width={60}
            height={20}
            fill={colorScale(state.state_name)}
            stroke="black"
            strokeWidth={3}
          />
          <text
            x={405}
            y={246 + 25 * i}
            width={20}
            height={20}
            stroke="black"
            fill="black"
            fontSize={"1rem"}
            fontFamily={theme.typography.fontFamily}
            pointerEvents="none"
          >
            {state.state_name}
          </text>
        </React.Fragment>
      ))}
    </>
  );
}
