import { PlayerStateDataType } from "@/types/recruitTypes";
import { Typography } from "@mui/material";
import { ScaleOrdinal } from "d3";
import React from "react";

type PieLegendPropType = {
  colorScale: ScaleOrdinal<string, string, never>;
  playerData: PlayerStateDataType[];
};

export default function PieLegend(props: PieLegendPropType) {
  const { colorScale, playerData } = props;

  return (
    <>
      {playerData.map((state, i) => (
        <React.Fragment key={`${state.state_name}_legend`}>
          <rect
            x={380}
            y={150 + 25 * i}
            width={20}
            height={20}
            fill={colorScale(state.state_name)}
            stroke="white"
            strokeWidth={2}
          />
          <foreignObject x={405} y={144 + 25 * i} width={50} height={250}>
            <Typography fontSize={"1.2rem"}>{state.state_name}</Typography>
          </foreignObject>
        </React.Fragment>
      ))}
    </>
  );
}
