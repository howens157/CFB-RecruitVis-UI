import { GeoPath, GeoPermissibleObjects } from "d3-geo";
import React from "react";
import { StateGeoJson } from "@/types/geoTypes";

type StatePropType = {
  features: StateGeoJson[];
  pathGenerator: GeoPath<any, GeoPermissibleObjects>;
};

const States: React.FC<StatePropType> = ({ features, pathGenerator }) => {
  console.log("states rerendering");

  return (
    <>
      {features.map((feature) => (
        <path
          stroke="#aaa"
          fill="#ddd"
          key={`${feature.properties.STATE}_path`}
          d={pathGenerator(feature) || ""}
        />
      ))}
    </>
  );
};

export default React.memo(States);
