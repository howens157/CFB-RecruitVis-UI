import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { GeoProjection } from "d3-geo";
import stateCenters from "@/static/stateCenters.json";
import { pointer, scaleSqrt } from "d3";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { stateCountZeroes } from "./Constants";

type StateCenterType = {
  [key: string]: {
    long: number;
    lat: number;
  };
};

type RecruitCirclesProp = {
  stateCounts: { [key: string]: number };
  circleColor: string;
  projection: GeoProjection;
};

const stateCentersTyped: StateCenterType = stateCenters;

// Idea, have 50 circles regardless, and just set radius to 0 if there are none in that state, store old radius and new radius so you can
// animate between them
export default function RecruitCircles(props: RecruitCirclesProp) {
  const { stateCounts, projection, circleColor } = props;

  const prevStatesRef = useRef<{ [key: string]: number }>(stateCountZeroes);
  const prevStates = prevStatesRef.current;

  // Update ref to store previous states whenever states change
  useEffect(() => {
    prevStatesRef.current = stateCounts;
  }, [stateCounts]);

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
    (
      event: React.MouseEvent<SVGCircleElement>,
      name: string,
      count: number
    ) => {
      let [xPosition, yPosition] = pointer(event);
      if (xPosition + 100 > 600) {
        xPosition = xPosition - 100;
      }
      setTooltip({
        x: xPosition,
        y: yPosition,
        content: `${name}: ${count}`,
      });
    },
    [] // Dependencies array: This callback doesn't depend on any external state or props
  );

  const handleMouseOut = useCallback(() => {
    setTooltip(null);
  }, []); // Dependencies array: This callback doesn't depend on any external state or props

  // sort in largest counts to smallest so larger circles don't obscure smaller ones
  const sortedStateCounts = useMemo(() => {
    return Object.entries(stateCounts).sort((a, b) => b[1] - a[1]);
  }, [stateCounts]);

  return (
    <>
      {sortedStateCounts.map((state) => {
        const [name, count] = state;
        const prevCount = prevStates[name];
        let stateCenter = stateCentersTyped[name];

        let mappedCoords = projection([stateCenter.long, stateCenter.lat]);

        if (mappedCoords && (count > 0 || prevCount > 0)) {
          return (
            <motion.circle
              key={`${name}_circle`}
              cx={parseFloat(mappedCoords[0].toFixed(10))}
              cy={parseFloat(mappedCoords[1].toFixed(10))}
              initial={{
                r: rPopScale(prevCount),
                strokeWidth: 2,
                fillOpacity: 0.7,
              }}
              animate={{
                r: rPopScale(count),
                strokeWidth: count > 0 ? 2 : 0,
                fillOpacity: count > 0 ? 0.7 : 0,
              }}
              transition={{ duration: 1 }}
              fillOpacity={0.7}
              fill={circleColor}
              stroke="white"
              whileHover={{ strokeWidth: 4 }}
              strokeWidth={2}
              onMouseMove={(e) => handleMouseMove(e, name, count)}
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
