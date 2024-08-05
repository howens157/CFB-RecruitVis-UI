import RecruitMapReact from "@/components/RecruitsBySchoolVis";
import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box sx={{ margin: "10px 30px" }}>
        <RecruitMapReact/>
      </Box>
    </main>
  );
}
