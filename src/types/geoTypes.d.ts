import { Feature, FeatureCollection, Geometry } from "geojson";

export type StateGeoJson = Feature<
  Geometry,
  {
    GEO_ID: string;
    STATE: string;
    NAME: string;
    LSAD: string;
    CENSUSAREA: number;
  }
>;

export type StateGeoFeatures = FeatureCollection<
  Geometry,
  {
    GEO_ID: string;
    STATE: string;
    NAME: string;
    LSAD: string;
    CENSUSAREA: number;
  }
>;
