import { useState, useCallback, useMemo } from "react";
import { GeoProjection } from "d3-geo";
import stateCenters from "@/static/stateCenters.json";
import { pointer, scaleSqrt } from "d3";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PlayerStateDataType } from "@/types/recruitTypes";

type StateCenterType = {
  [key: string]: {
    long: number;
    lat: number;
  };
};

type RecruitCirclesProp = {
  playerStateData: PlayerStateDataType[] | null;
  circleColor: string;
  projection: GeoProjection;
};

const stateCentersTyped: StateCenterType = stateCenters;

export default function RecruitCircles(props: RecruitCirclesProp) {
  const { playerStateData, projection, circleColor } = props;

  //TODO: scale domain based on length of years range
  const rPopScale = useMemo(
    () => scaleSqrt().domain([0, 200]).range([1, 100]),
    []
  );

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGCircleElement>, state: PlayerStateDataType) => {
      let [xPosition, yPosition] = pointer(event);
      if (xPosition + 100 > 600) {
        xPosition = xPosition - 100;
      }
      setTooltip({
        x: xPosition,
        y: yPosition,
        content: `${state.state_name}: ${state.count}`,
      });
    },
    [] // Dependencies array: This callback doesn't depend on any external state or props
  );

  const handleMouseOut = useCallback(() => {
    setTooltip(null);
  }, []); // Dependencies array: This callback doesn't depend on any external state or props

  return (
    <>
      {playerStateData?.map((state) => {
        let stateCenter = stateCentersTyped[state.state_name];
        let mappedCoords = projection([stateCenter.long, stateCenter.lat]);

        if (mappedCoords) {
          return (
            <motion.circle
              key={`${state.state_name}_circle`}
              cx={parseFloat(mappedCoords[0].toFixed(10))}
              cy={parseFloat(mappedCoords[1].toFixed(10))}
              initial={{ r: 0 }}
              animate={{ r: rPopScale(state.count) }}
              transition={{ duration: 0.1 }}
              fillOpacity={0.7}
              fill={circleColor}
              stroke="black"
              whileHover={{ strokeWidth: 4 }}
              strokeWidth={2}
              onMouseMove={(e) => handleMouseMove(e, state)}
              onMouseOut={handleMouseOut}
            />
          );
        }
      })}
      {tooltip && (
        <foreignObject
          x={tooltip.x + 10}
          y={tooltip.y + 10}
          width={100}
          height={50}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.75)",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            <Typography>{tooltip.content}</Typography>
          </div>
        </foreignObject>
      )}
    </>
  );
}
