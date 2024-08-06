import { GeoProjection } from "d3-geo";

type SchoolLogoProp = {
  lat: number | null | undefined;
  lng: number | null | undefined;
  imgSrc: string | null | undefined;
  projection: GeoProjection;
};

export default function SchoolLogo(props: SchoolLogoProp) {
  const { lat, lng, imgSrc, projection } = props;

  // Return nothing if lat, lng, or imgSrc are null
  if (!lat || !lng || !imgSrc) {
    return null;
  }

  const mappedCoords = projection([lng, lat]);

  // Return nothing if projection fails to map coordinates
  if (!mappedCoords) {
    return null;
  }


  let secureImageSrc: string | null = null;
  if(imgSrc && imgSrc.substring(0,5) === 'http:') {
    secureImageSrc = `https:${imgSrc.substring(5)}`
  }

  return (
    <image
      href={secureImageSrc || imgSrc}
      x={mappedCoords[0]-25}
      y={mappedCoords[1]-25}
      width="50"
      height="50"
    />
  );
}
