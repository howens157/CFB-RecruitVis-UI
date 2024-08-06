"use client";
import { useAppSelector } from "@/lib/hooks";
import { Box, Paper, Typography } from "@mui/material";
import icon from "@/app/icon.ico";
import Image from "next/image";

export default function NavBar() {
  const { textColor, navColor, paperColor } = useAppSelector(
    (state) => state.color
  );

  // const linkStyle = {
  //   "& a": {
  //     padding: "5px 10px 5px 10px",
  //     display: "flex",
  //     color: textColor,
  //     textDecoration: "none",
  //     "&:hover": {
  //       backgroundColor: paperColor,
  //     },
  //   },
  // };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: navColor,
        borderRadius: "0",
      }}
    >
      {/* left */}
      <Box display="flex">
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          <Image src={icon.src} alt="Football Icon" width={20} height={20} />
        </Box>
        <Typography
          sx={{
            padding: "5px 10px 5px 10px",
            color: textColor,
            textDecoration: "none",
          }}
        >
          CFB Recruit Vis
        </Typography>
      </Box>
      {/* right */}
      <Box display="flex">
        {/* commenting out until there actually are 2 visualizations */}
        {/* <Box sx={linkStyle}>
          <Link href="/" passHref>
            <Typography>Recruits By School</Typography>
          </Link>
        </Box>
        <Box sx={linkStyle}>
          <Link href="/perTown" passHref>
            <Typography>Recruits Per Town</Typography>
          </Link>
        </Box> */}
      </Box>
    </Paper>
  );
}
