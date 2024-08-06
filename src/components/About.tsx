import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleDrawer } from "@/lib/layoutSlice";
import { Box, Drawer, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import icon from "@/app/icon.ico";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import githubIcon from "@/static/images/github-mark-white.png";
import cfbdLogo from "@/static/images/CFBDLogo.png";

export default function About() {
  const { backgroundColor, paperColor, textColor } = useAppSelector(
    (state) => state.color
  );
  const { drawerOpen } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      anchor="bottom"
      sx={{}}
      PaperProps={{
        sx: {
          borderRadius: "30px 30px 0 0",
          backgroundColor: backgroundColor,
          boxShadow: "0px 0px 50px #000",
          "& p": { color: textColor },
          alignItems: "center",
          padding: "20px",
          maxHeight: "88vh",
          overflow: "auto",
        },
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "10px",
          right: "40px",
          borderRadius: "100%",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        whileHover={{
          scale: 1.3,
          backgroundColor: paperColor,
        }}
        whileTap={{
          top: "30px",
        }}
        onClick={() => dispatch(toggleDrawer())}
      >
        <KeyboardArrowDownIcon sx={{ color: textColor }} />
      </motion.div>

      <Box
        sx={{
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px 10px 10px 10px",
        }}
      >
        <Image src={icon.src} alt="Football Icon" width={50} height={50} />
        <Typography
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
            marginTop: "20px",
          }}
        >
          CFB Recruiting Vis
        </Typography>

        <Typography gutterBottom sx={{ textAlign: "center" }}>
          This application provides insights into where college football
          programs across the country recruit their players.
        </Typography>
        <Typography gutterBottom sx={{ textAlign: "center" }}>
          Select a school and a range of years, and hover over the
          visualizations for more details!
        </Typography>

        <Typography
          gutterBottom
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Data for this visualization is provided by College Football Data.
          Thanks to them for making a wide range of college football data freely
          available. Check them out for more data analytics and visualizations
          on college football.
        </Typography>
        <a
          href="https://collegefootballdata.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            style={{
              borderRadius: "100%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.15,
            }}
          >
            <Image
              src={cfbdLogo}
              alt="CollegeFootballData website"
              height={50}
            />
          </motion.div>
        </a>

        <Typography
          gutterBottom
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Interested in how these visualizations were created using d3.js and
          React? Clone the GitHub repository to run it yourself and make
          your own changes!
        </Typography>
        <a
          href="https://github.com/howens157/CFB-RecruitVis-UI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            style={{
              borderRadius: "100%",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.15,
            }}
          >
            <Image src={githubIcon} alt="GitHub Repo" width={50} height={50} />
          </motion.div>
        </a>
      </Box>
    </Drawer>
  );
}
