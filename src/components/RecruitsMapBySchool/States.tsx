import { GeoGeometryObjects, GeoPath, GeoPermissibleObjects } from "d3-geo";
import React from "react";

type StateGeoJson = {
  type: string;
  properties: {
    GEO_ID: string;
    STATE: string;
    NAME: string;
    LSAD: string;
    CENSUSAREA: number;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
};

type StatePropType = {
  features: StateGeoJson[];
  pathGenerator: GeoPath<any, GeoPermissibleObjects>;
};

export default function States(props: StatePropType) {
  let pathGenerator = props.pathGenerator;
  let features = props.features;
  return features.map((feature) => 
      <path
        stroke="#aaa"
        fill="#ddd"
        key={`${feature.properties.STATE}_path`}
        d={pathGenerator(feature)}
      />
    );
}
