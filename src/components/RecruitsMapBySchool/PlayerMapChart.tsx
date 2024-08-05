import { Box, Typography } from "@mui/material";
import { geoAlbersUsa, geoPath } from "d3-geo";
import us_geo_data from "@/static/gz_2010_us_040_00_500k.json";
import States from "./States";
import RecruitCircles from "./RecruitCircles";
import SchoolLogo from "./SchoolLogo";
import { SchoolDataType } from "@/types/recruitTypes";
import useSchoolData from "@/hooks/useSchoolData";
import { useAppSelector } from "@/lib/hooks";

type PlayerMapChartProps = {
  schoolData: SchoolDataType | null;
  loading: boolean;
};

export default function PlayerMapChart({schoolData, loading}: PlayerMapChartProps) {
  const mapTitle = useAppSelector((state) => state.typography.mapTitle);
  // call useSchoolData hook
  
  let projection = geoAlbersUsa().fitExtent(
    [
      [0, 0],
      [800, 600],
    ],
    us_geo_data
  );

  let pathGenerator = geoPath().projection(projection);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="600px"
      sx={{
        marginTop: {
          xl: "0px",
          lg: "-65px",
          md: "-160px",
          sm: "-180px",
          xs: "-190px",
        },
      }}
    >
      <svg viewBox="0 0 800 600">
        <States pathGenerator={pathGenerator} features={us_geo_data.features} />
        {!loading && schoolData && (
          <>
            <RecruitCircles
              playerStateData={schoolData.playerData}
              projection={projection}
              circleColor={schoolData.alt_color}
            />
            <SchoolLogo
              projection={projection}
              lat={schoolData.lat}
              lng={schoolData.lng}
              imgSrc={schoolData.logo}
            />
          </>
        )}
      </svg>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "center",
          marginTop: "-15px",
        }}
      >
        {mapTitle}
      </Typography>
    </Box>
  );
}
