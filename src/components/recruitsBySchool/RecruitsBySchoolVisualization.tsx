import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerMapChart from "./RecruitsMapBySchool/PlayerMapChart";
import PieChart from "./RecruitsBySchoolPieChart/PieChart";
import useSchoolData from "@/hooks/useSchoolData";
// import SomethingWentWrong from "./SomethingWentWrong";
import { useAppDispatch } from "@/lib/hooks";
import { setColors } from "@/lib/colorSlice";
import dynamic from "next/dynamic";
const SomethingWentWrong = dynamic(() => import("../SomethingWentWrong"));

type RecruitsBySchoolVisualizationProps = {
  schoolName: string;
  yearStart: number;
  yearEnd: number;
};

const RecruitsBySchoolVisualization = React.memo(
  function RecruitsBySchoolVisualization({
    schoolName,
    yearStart,
    yearEnd,
  }: RecruitsBySchoolVisualizationProps) {
    const [retryFlag, setRetryFlag] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [longLoading, setLongLoading] = useState<boolean>(false);
    const {
      data: schoolData,
      loading,
      error,
    } = useSchoolData(schoolName, yearStart, yearEnd, retryFlag);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (schoolData) {
        const color = schoolData.color;
        const altColor = schoolData.alt_color;
        dispatch(setColors({ color, altColor }));
      } else {
        dispatch(setColors({ color: "", altColor: "" }));
      }
    }, [schoolData, dispatch]);

    useEffect(() => {
      let timeout: NodeJS.Timeout;
      let longTimeout: NodeJS.Timeout;
      if (loading) {
        timeout = setTimeout(() => {
          setShowLoading(true);
        }, 1500);
        longTimeout = setTimeout(() => {
          setLongLoading(true);
        }, 5000);
      } else {
        setShowLoading(false);
      }

      return () => {
        clearTimeout(timeout);
        clearTimeout(longTimeout);
      };
    }, [loading]);

    if (error) {
      return (
        <Box alignItems="center" justifyContent="center" width="100%">
          <SomethingWentWrong
            message="Error Fetching School Data. Please try again, or try a different school"
            onRetry={() => setRetryFlag((prev) => !prev)}
          />
        </Box>
      );
    }

    return (
      <Grid container>
        <Grid item xs={12} xl={8}>
          <PlayerMapChart
            schoolData={schoolData}
            loading={showLoading}
            longLoading={longLoading}
          />
        </Grid>
        <Grid item xs={12} xl={4}>
          <PieChart schoolData={schoolData} />
        </Grid>
      </Grid>
    );
  }
);

export default RecruitsBySchoolVisualization;
