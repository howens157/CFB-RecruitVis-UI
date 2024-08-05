import { GeoProjection } from "d3-geo";

type SchoolLogoProp = {
  lat: number | null;
  lng: number | null;
  imgSrc: string | null;
  projection: GeoProjection;
};

export default function SchoolLogo(props: SchoolLogoProp) {
  const { lat, lng, imgSrc, projection } = props;

  // Return nothing if lat, lng, or imgSrc are null
  if (lat === null || lng === null || imgSrc === null) {
    return null;
  }

  const mappedCoords = projection([lng, lat]);

  // Return nothing if projection fails to map coordinates
  if (!mappedCoords) {
    return null;
  }

  return (
    <image
      href={imgSrc}
      x={mappedCoords[0]-25}
      y={mappedCoords[1]-25}
      width="50"
      height="50"
    />
  );
}
