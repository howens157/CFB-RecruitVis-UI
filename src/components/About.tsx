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
          Data for this visualization is sourced from 247Sports and contains all
          recruits with a 247Sports Composite Ranking since 2000.
        </Typography>
        <a
          href="https://247sports.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            style={{
              borderRadius: "100%",
              width: "160px",
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
            <svg version="1.1" aria-hidden="true" viewBox="0 0 888.1 150.9">
              <path
                fill="#FFF"
                d="M164.4,113.9l8.5-24.1l-56.3-0.1l1.5-4.4c1.5-4.4,3.4-9.1,5.1-13.5c0.3-0.9,0.9-1.6,1.6-2.3 c24.6-19.7,46.2-33.2,68.9-52.5c0.7-0.5,1.7-1.1,2.5-1.1c1.7,0,3.8,0,6,0c9.6,0,20.6,0.1,24.3,0.1h0.5l-17.7,51.1h38.7l-22.6,22.6 h-24.6l-8.1,24.1H164.4z M160.3,67.2h20.2l6.3-19L160.3,67.2z"
              ></path>
              <path
                fill="#FFF"
                d="M599.4,16.5c8.5,0.5,13.2,5.2,13.2,12.9c-0.1,3.5-0.9,7.3-2.1,10.8c-4,12.1-8.3,24-12.7,36 c-1,2.7-2.3,5.3-3.9,7.9c-3.9,6.4-9.6,10-16.6,11.2c-2.8,0.5-5.6,0.7-8.4,0.8c-12.2,0.1-24.5,0.1-36.6,0c-3.1-0.1-6.3-0.5-9.3-1.3 c-6.4-1.9-9.7-7-8.7-14.1c0.5-3.5,1.5-7.2,2.7-10.8c4-11.6,8-23.1,12.3-34.7c2.2-6,5.6-11.4,11.5-15.1c4.9-3.1,10.1-3.9,15.3-3.9 C562.9,16,591.8,16,599.4,16.5z M566.9,75.1c0.2,0,0.4,0,0.6,0c4.5-0.2,6.6-1.5,8.1-5.8c3.2-8.6,6.2-17.1,9.1-25.8 c1.4-4.3,0.2-6.3-4.1-6.4c-7.2-0.2-14.4-0.2-21.7,0c-4.1,0.1-6.1,1.8-7.7,5.9c-0.6,1.6-1.2,3.2-1.7,4.9c-2.4,6.7-4.8,13.3-7.1,19.9 c-1.8,5.3-0.5,7.3,4.8,7.4C550.4,75.2,563.6,75.1,566.9,75.1L566.9,75.1z"
              ></path>
              <path
                fill="#FFF"
                d="M362.9,70.4c-0.5,1.9-1,3.5-1.4,5.2c-0.4,1.6,0.3,2.6,1.9,2.9c0.8,0.2,1.6,0.2,2.5,0.3c7.2,0,14.5,0,21.7,0 c4.2,0,5.6-1,7.1-5.2c0.5-1.4,0.9-2.7,1.3-4.1c0.5-2.5-0.1-3.4-2.5-3.6c-4.1-0.4-8.2-0.8-12.3-1.1c-7.6-0.8-15.2-1.3-22.7-2.4 c-8.8-1.3-12-6.8-9.3-15.9c1.6-5.5,3.5-11,5.8-16.2c4.2-9.7,9.8-13.7,19.8-13.8c15.2-0.2,30.4-0.1,45.5,0c2.1,0.1,4.2,0.4,6.2,1.1 c5,1.9,6.7,6,5.9,11.4c-0.5,3.5-1.8,7.2-2.8,10.8c-0.1,0.4-1,1.1-1.4,1.1c-7.4,0.1-14.7,0-22.1,0c-0.1,0-0.2-0.1-0.4-0.3 c0.2-0.7,0.5-1.5,0.7-2.2c0.9-3.3,0.1-4.7-3.3-4.7c-5.7-0.1-11.4,0-17.1,0c-1.3,0-2.5,0-3.8,0c-2.7,0.1-4,1-5.1,3.5 c-0.7,1.5-1.1,3.1-1.5,4.6c-0.5,2.1,0.2,3,2.3,3.2c7.2,0.7,14.3,1.3,21.4,2c5,0.5,10,0.9,14.9,1.8c7.5,1.5,10.5,6.3,8.4,14.1 c-1.9,7-4.3,13.9-7.2,20.5c-3.8,8.8-9.6,12.6-19.3,12.7c-16,0.2-32,0.1-48,0c-1.9,0-3.7-0.3-5.5-0.9c-5.9-1.9-8.2-6.6-6.6-13.5 c0.8-3.4,2-6.8,3.2-10.2c0.1-0.4,0.9-1,1.3-1C347.8,70.3,355.3,70.4,362.9,70.4z"
              ></path>
              <path
                fill="#FFF"
                d="M843.8,40.6c0.3-1.4,0.6-2.4,0.8-3.4c0.5-2.7-0.3-3.7-2.9-3.8c-3.4-0.1-17.5-0.1-21.1,0 c-3.1,0.1-4.6,1.2-5.7,4.2c-2.6,7.2-1.6,7,4.3,7.5c9.9,0.9,19.8,1.7,29.7,2.9c2.8,0.3,5.5,1.2,8,2.5c3.4,1.7,4.7,5,4.4,9.1 c-0.4,5.4-2.7,10.5-4.6,15.8c-1.4,3.7-2.8,7.5-4.7,11c-2.7,5-7,8-12.4,9c-2.4,0.4-4.9,0.7-7.4,0.7c-14.7,0.1-29.4,0.1-44.1,0 c-2.7,0-5.3-0.4-7.9-1.2c-4.9-1.5-7-5.4-6.3-10.6c0.7-4.5,2.2-9.1,3.4-13.7h24c-0.4,1.4-0.9,2.6-1.3,3.8c-0.9,2.8-0.1,4,2.7,4.3 c0.4,0.1,0.9,0.1,1.4,0.1c7.2,0,14.4,0,21.7,0c4.3,0,5.7-1.1,7-5.2c0.4-1.1,0.8-2.3,1.2-3.5c0.9-2.7,0.2-4-2.5-4.3 c-7-0.7-14-1.2-21-2c-5.7-0.7-11.6-1.1-17-2.5c-5.7-1.4-8.1-5.9-6.7-12c1.3-5.5,3.4-10.9,5.2-16.3c0.7-2,1.5-4,2.6-5.9 c3.4-6.5,8.8-9.9,15.7-10.6c1.6-0.2,3.3-0.3,5-0.3c13.9,0,27.7-0.1,41.6,0c2.1,0,4.1,0.3,6.1,0.7c5.6,1.3,8.5,5.1,7.8,11.1 c-0.5,3.8-1.8,7.7-2.8,11.6c-0.1,0.4-1,1.1-1.4,1.1C858.9,40.6,851.4,40.6,843.8,40.6z"
              ></path>
              <path
                fill="#FFF"
                d="M673.3,68.4c2.7,9.2,5.3,18.3,8,27.7h-12.7c-3.5,0-7.1-0.1-10.6,0.1c-1.3,0.1-1.7-0.4-2-1.5 c-1.9-7.5-4-14.8-5.9-22.3c-0.4-1.4-1-2-2.6-1.9c-3.7,0.1-7.3,0.1-10.9,0c-1.5-0.1-2.1,0.5-2.6,2c-2.6,7.4-5.2,14.8-7.9,22.3 c-0.2,0.4-0.4,0.9-0.7,1.4h-24.4c0.9-2.7,1.7-5.2,2.7-7.8c6.5-18.5,13-37,19.5-55.5c1.7-5,3.6-10,5.3-15.1c0.4-1.1,0.9-1.5,2-1.5 c18.6,0.1,37.2,0,55.7,0.1c2.3,0.1,4.7,0.4,6.9,1.2c6,2,8.5,6.5,7.2,13.7c-1.5,8.6-4.6,17-8.6,25.2c-3.4,7-9.2,10.8-16.6,11.8 C674.7,68.1,674.1,68.2,673.3,68.4z M647.3,34.3L641,52.4c0.3,0.2,0.4,0.3,0.5,0.3c7.8,0,15.6,0.1,23.4-0.1c2.3,0,4.3-1.2,5.2-3.5 c1.3-3.3,2.6-6.6,3.5-9.9s0.1-4.8-3.2-4.9C662.9,34.2,655.2,34.3,647.3,34.3z"
              ></path>
              <path
                fill="#FFF"
                d="M453.8,73.1c-2.7,7.7-5.4,15.2-8.1,22.8h-24.6c2.6-7.4,5.2-14.7,7.8-22.1c6.6-18.7,13.1-37.3,19.7-56 c0.5-1.4,1-1.8,2.5-1.8c17.9,0.1,35.9,0,53.8,0.1c2.4,0,4.7,0.3,7.1,0.8c6.7,1.4,10.2,6.6,8.8,13.9c-0.8,4.4-2.3,8.7-3.8,13 c-2,5.6-3.9,11.2-6.4,16.7c-3.4,7.5-9.6,11.7-17.4,12.1c-9.1,0.5-18,0.3-27,0.4C461.9,73.2,457.9,73.1,453.8,73.1z M460.1,54.8 c0.3,0.1,0.7,0.2,1.1,0.2c7.4,0,14.8,0,22.3,0c2.5,0,4.7-0.9,5.8-3.4c1.6-4.1,3.1-8.2,4.3-12.4c0.7-2.4-0.3-3.6-2.7-3.9 c-1-0.1-2.1-0.2-3.1-0.2c-5.2,0-10.5,0-15.7,0c-4.9,0-4.9,0-6.6,4.9c-0.1,0.2-0.2,0.4-0.2,0.6C463.4,45.4,461.8,50.1,460.1,54.8 L460.1,54.8z"
              ></path>
              <path
                fill="#FFF"
                d="M99,114.1c-8-0.1-16-0.1-22.2-0.1H58.2H10.4c0,0,2.4-7,3.1-9c1-2.8,2-5.6,3-8.5c2.5-6.9,5-14.1,7.6-21.2 c3.3-8.8,9.7-14.2,18.9-15.9c5.8-1.1,11.7-1.9,17.5-2.6h0.1c1.7-0.2,3.4-0.4,5.1-0.7c6-0.8,12-1.6,17.8-2.3l6.8-0.9 c3-0.4,5-2,6.1-4.9c0.2-0.5,0.4-1.1,0.7-1.7c0.5-1.3,1-2.6,1.4-3.8c0.2-0.6,0.3-1.4,0.3-1.9s-0.1-1.1-1-1.7 c-0.7-0.5-1.2-0.6-1.8-0.7c-1-0.2-1.8-0.2-2.9-0.2c-3.4,0-16.5,0-19.5,0c-2.8,0-4.2,0.3-5.2,1c-1,0.8-1.8,2-2.8,4.7 c-0.9,2.5-1.4,3.3-2.1,3.9c-0.8,0.5-1.7,0.6-4.1,0.6H35.5l0.1-0.3c0.2-0.7,0.4-1.4,0.7-2c0.5-1.5,0.9-2.8,1.4-4.2 c0.4-1.1,0.9-2.3,1.3-3.5c1.3-3.4,2.6-6.9,4.3-10.2c3.4-6.6,9.1-10.5,16.9-11.6c2.9-0.4,5.9-0.6,8.8-0.7c8.4-0.1,15.4-0.1,22.4-0.1 c7.6,0,14.5,0.1,20.8,0.1c3.3,0,6.7,0.4,9.9,1.3c6,1.6,9,6,8.6,12.4c-0.2,2.9-0.8,6.1-1.9,9.9c-1.4,4.7-3.1,9.5-4.8,14.1l-0.4,1 c-4.1,11.5-10.5,16.9-22.1,18.8c-7.1,1.1-14.2,2.1-21.2,2.9c-2.6,0.3-5.6,0.7-8.4,1.1c-2.1,0.3-4.3,0.5-6.3,0.8l-0.2,0.1 c-2.7,0.3-5.7,0.7-8.6,1.1c-4,0.5-5.3,1.7-6.9,5.7c-0.2,0.5-0.4,0.9-0.5,1.5L48.2,90h61.4l-0.7,2c-0.3,1-0.7,1.9-1,2.8 c-0.5,1.5-1.1,3.1-1.6,4.6l-0.1,0.2c-1.5,4.1-3,8.3-4.4,12.4C101.4,113.6,100.7,114.1,99,114.1L99,114.1z"
              ></path>
              <path
                fill="#5FBF24"
                d="M200.1,134.9L297.3,41H263l-5,12.8h-27.9l13.8-37.9h104.9l-7.6,21.3l-103,97.7H200.1z"
              ></path>
              <path
                fill="#FFF"
                d="M735.8,96h-24.6c6.8-19.3,13.5-38.5,20.4-58h-25.7c0.9-2.6,5.7-15.9,7.1-20.3c0.4-1.2,0.9-1.6,2.2-1.6 c24.3,0.1,48.6,0.1,72.9,0.1c0.4,0,0.9,0.1,1.5,0.2c-0.9,2.6-5.6,15.8-7,20c-0.4,1.4-1.1,1.6-2.3,1.6c-7.4-0.1-14.7,0-22.1-0.1 c-1.4,0-2.1,0.4-2.6,1.9C749.9,55.8,736.7,93.2,735.8,96z"
              ></path>
            </svg>
          </motion.div>
        </a>

        <Typography
          gutterBottom
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Interested in how these visualizations were created using d3.js and
          React? Clone the GitHub repository to run it yourself and make your
          own changes!
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
