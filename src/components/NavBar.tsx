"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const navStyle = {
  display: "flex",
  justifyContent: "start",
  backgroundColor: "#333",
};

const linkStyle = {
  "& a": {
    padding: "5px 10px 5px 10px",
    display: "flex",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#888",
    },
  },
};

export default function NavBar() {
  return (
    <Box sx={navStyle}>
      <Box sx={{...linkStyle}}>
        <Link href="/" passHref>
          <Typography>Recruits By School</Typography>
        </Link>
      </Box>
      <Box sx={linkStyle}>
        <Link href="/perTown" passHref>
          <Typography>Recruits Per Town</Typography>
        </Link>
      </Box>
    </Box>
  );
}
