import { Box, Typography } from "@mui/material";
import { geoAlbersUsa, geoPath } from "d3-geo";
import us_geo_data from "@/static/gz_2010_us_040_00_500k.json";
import States from "./States";
// import RecruitCircles from "./RecruitCircles";
// import SchoolLogo from "./SchoolLogo";
import { PlayerStateDataType, SchoolDataType } from "@/types/recruitTypes";
import { useAppSelector } from "@/lib/hooks";
import { StateGeoFeatures } from "@/types/geoTypes";
import { useMemo } from "react";
import { allStates } from "./Constants";
import dynamic from 'next/dynamic';
const RecruitCircles = dynamic(() => import('./RecruitCircles'));
const SchoolLogo = dynamic(() => import('./SchoolLogo'));
const Backdrop = dynamic(() => import('@mui/material/Backdrop'));
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'));

type PlayerMapChartProps = {
  schoolData: SchoolDataType | null;
  loading: boolean;
  longLoading: boolean;
};

const usGeoData = us_geo_data as StateGeoFeatures;

const calculateStateCounts = (data: PlayerStateDataType[]) => {
  const stateCounts: { [key: string]: number } = {};
  allStates.forEach((state: string) => {
    stateCounts[state] = 0;
  });
  data.forEach((stateData) => {
    stateCounts[stateData.state_name] += stateData.count;
  });
  return stateCounts;
};

export default function PlayerMapChart({
  schoolData,
  loading,
  longLoading,
}: PlayerMapChartProps) {
  const mapTitle = useAppSelector((state) => state.typography.mapTitle);

  let projection = useMemo(
    () =>
      geoAlbersUsa().fitExtent(
        [
          [0, 0],
          [800, 600],
        ],
        usGeoData
      ),
    []
  );

  let pathGenerator = useMemo(
    () => geoPath().projection(projection),
    [projection]
  );

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: {
            xl: "100%",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xl: "calc(min(1000px, 60vw))",
              xs: "calc(100vw - 100px)",
            },
            height: {
              xl: "550px",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            viewBox="0 0 800 610"
            style={{ width: "100%", maxHeight: "610px" }}
          >
            <States
              pathGenerator={pathGenerator}
              features={usGeoData.features}
            />
            {schoolData?.playerData && (
              <>
                <RecruitCircles
                  stateCounts={calculateStateCounts(
                    schoolData?.playerData || []
                  )}
                  projection={projection}
                  circleColor={schoolData?.alt_color || "white"}
                />
                <SchoolLogo
                  projection={projection}
                  lat={schoolData?.lat}
                  lng={schoolData?.lng}
                  imgSrc={schoolData?.logo}
                />
              </>
            )}
            {!loading && schoolData && <></>}
          </svg>
        </Box>
        <Typography
          sx={{
            fontSize: "calc(min(18px, 4vw))",
            fontWeight: {
              xs: "500",
              md: "700",
            },
            textAlign: "center",
          }}
        >
          {mapTitle}
        </Typography>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" />
          {longLoading && (
            <Typography sx={{ marginTop: "20px" }}>
              This may take a few seconds...
            </Typography>
          )}
        </Box>
      </Backdrop>
    </>
  );
}
