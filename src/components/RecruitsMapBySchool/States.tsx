import { GeoPath, GeoPermissibleObjects } from "d3-geo";
import React from "react";
import { Feature } from "geojson";

type StatePropType = {
  features: Feature[];
  pathGenerator: GeoPath<any, GeoPermissibleObjects>;
};

const States: React.FC<StatePropType> = ({ features, pathGenerator }) => {

  return (
    <>
      {features.map((feature) => (
        <path
          stroke="#aaa"
          fill="#ddd"
          key={`${feature.id}_path`}
          d={pathGenerator(feature) || ""}
        />
      ))}
    </>
  );
};

export default React.memo(States);
