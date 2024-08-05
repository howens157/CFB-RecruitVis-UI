import { arc } from "d3";
import React from "react";

export default function PieSkeleton() {
  const arcGenerator = arc<any>().innerRadius(60).outerRadius(170);

  return (
    <g transform={`translate(250, 300)`}>
      <path
        stroke="white"
        strokeWidth={2}
        fill="#ddd"
        d={arcGenerator({
          data: 100,
          index: 0,
          value: 100,
          startAngle: 0,
          endAngle: 6.283185307179587,
          padAngle: 0,
        }) || ""}
      />
    </g>
  );
}
