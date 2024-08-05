import { PlayerStateDataType } from "@/types/recruitTypes";
import { Typography, useTheme } from "@mui/material";
import { PieArcDatum, ScaleOrdinal, arc, pie, pointer } from "d3";
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

type PieSectionsPropType = {
  colorScale: ScaleOrdinal<string, string, never>;
  playerData: PlayerStateDataType[];
};

export default function PieSections(props: PieSectionsPropType) {
  const { colorScale, playerData } = props;
  const theme = useTheme(); // Access the MUI theme

  // Memoize pie and arc generators to avoid recalculations on each render
  const pieGenerator = useMemo(
    () => pie<PlayerStateDataType>().value((d) => d.count),
    []
  );
  const arcGenerator = useMemo(
    () => arc<any>().innerRadius(60).outerRadius(170),
    []
  );
  const arcData = useMemo(
    () => pieGenerator(playerData),
    [pieGenerator, playerData]
  );

  // Calculate total players
  const totalPlayers = useMemo(
    () =>
      playerData.reduce(
        (sum: number, state: PlayerStateDataType) => sum + state.count,
        0
      ),
    [playerData]
  );

  // State for managing the tooltip content and position
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  // Memoized event handler for mouse move
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGPathElement>, state: PlayerStateDataType) => {
      let [xPosition, yPosition] = pointer(event);
      if (xPosition + 100 > 300) {
        xPosition = xPosition - 100;
      }
      setTooltip({
        x: xPosition,
        y: yPosition,
        content: `${state.state_name}: ${state.count} players, ${(
          (state.count / totalPlayers) *
          100
        ).toFixed(2)}%`,
      });
    },
    [totalPlayers] // Dependency array: only re-create function if totalPlayers changes
  );

  // Memoized event handler for mouse out
  const handleMouseOut = useCallback(() => {
    setTooltip(null);
  }, []); // Dependency array: this callback doesn't depend on any external state or props

  return (
    <g transform={`translate(190, 300)`}>
      {arcData.map((arcSection) => (
        <motion.path
          stroke="black"
          strokeWidth={2}
          whileHover={{
            strokeWidth: 4,
            scale: 1.05,
          }}
          transition={{
            default: { duration: 0.2 }, // Speed up the scaling back down
            scale: { duration: 0.2 },
            strokeWidth: { duration: 0.2 },
          }}
          fill={colorScale(arcSection.data.state_name)}
          key={`${arcSection.data.state_name}_pie_section`}
          d={arcGenerator(arcSection)}
          onMouseMove={(e) => handleMouseMove(e, arcSection.data)}
          onMouseOut={handleMouseOut}
        />
      ))}
      {tooltip && (
        <g>
          <rect
            x={tooltip.x + 10}
            y={tooltip.y + 10}
            width={200}
            height={40}
            fill="rgba(0, 0, 0, 0.75)"
            rx={5}
            ry={5}
            style={{ pointerEvents: "none" }}
          />
          <text
            x={tooltip.x + 15}
            y={tooltip.y + 35}
            fill="white"
            fontSize={"1rem"}
            fontFamily={theme.typography.fontFamily}
            pointerEvents="none"
          >
            {tooltip.content}
          </text>
        </g>
      )}
    </g>
  );
}
