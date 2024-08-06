import RecruitsBySchool from "@/components/RecruitsBySchool";
import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          margin: { xl: "10px 30px", xs: "10px 2vw" },
        }}
      >
        <RecruitsBySchool />
      </Box>
    </main>
  );
}
