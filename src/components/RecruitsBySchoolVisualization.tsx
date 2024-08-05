import { Grid } from "@mui/material";
import React from "react";
import PlayerMapChart from "./RecruitsMapBySchool/PlayerMapChart";
import PieChart from "./RecruitsBySchoolPieChart/PieChart";
import nd_recruit_info from "@/static/nd_recruit_info.json";
import useSchoolData from "@/hooks/useSchoolData";

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
    const {
      data: schoolData,
      loading,
      error,
    } = useSchoolData({ schoolName, yearStart, yearEnd });

    //TODO: handle error
    return (
      <>
        <Grid item xs={12} xl={8}>
          <PlayerMapChart schoolData={schoolData} loading={loading} />
        </Grid>
        <Grid item xs={12} xl={4}>
          <PieChart schoolData={schoolData} loading={loading} />
        </Grid>
      </>
    );
  }
);

export default RecruitsBySchoolVisualization;
