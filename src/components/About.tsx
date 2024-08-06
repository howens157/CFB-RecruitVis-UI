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
      PaperProps={{
        sx: {
          borderRadius: "30px 30px 0 0",
          backgroundColor: backgroundColor,
          boxShadow: "0px 0px 50px #000",
          "& p": { color: textColor },
          alignItems: "center",
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
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px 10px 10px 10px",
        }}
      >
        {/* TODO: Figure out a way to scale the circles dynamically */}
        {/* TODO: Increase width of pie chart tooltip*/}
        <Image src={icon.src} alt="Football Icon" width={50} height={50} />
        <Typography>CFB Recruiting Vis</Typography>
        <Typography>
          This application is intended to provide some general insights as to
          where college football programs across the country primarily recruit
          their players from.
        </Typography>
        <Typography>
          Please select a school and a range of years, and don't forget to
          explore by hovering over the visualizations to see more specific
          details!
        </Typography>
        <Typography>
          The data source for this visualization is College Football Data. Thank
          you to them for making a wide range of college football data freely
          and easily available. Check them out if you are interested in data
          analytics/visualization regarding college football.
        </Typography>
        <a href="https://collegefootballdata.com/" target="_blank">
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
        <Typography>
          If you are interested in seeing how these visualizations were created
          using d3.js and React, or want to run it yourself and make some
          changes, feel free to clone the github repository!
        </Typography>
        <a
          href="https://github.com/howens157/CFB-RecruitVis-UI"
          target="_blank"
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
            <Image src={githubIcon} alt="Github Repo" width={50} height={50} />
          </motion.div>
        </a>
      </Box>
    </Drawer>
  );
}
