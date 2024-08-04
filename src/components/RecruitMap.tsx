"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import us_geo_data from "@/static/gz_2010_us_040_00_500k.json";
import nd_recruit_info from "@/static/nd_recruit_info.json";
import stateCenters from "@/static/stateCenters.json";
import * as d3 from "d3";

const mapContainerStyle = {
  "& path": {
    fill: "#ddd",
    stroke: "#aaa",
  },
};

const outerGridStyle = {
  border: "#333",
  borderStyle: "solid",
  boxSizing: "border-box",
  padding: "10px",
};

export default function RecruitMap() {
  const mapRef = useRef(null);
  const pieRef = useRef(null);
  let width = 800;
  let height = 600;
  let projection = d3.geoAlbersUsa().fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    us_geo_data
  );

  const rPopScale = d3.scaleSqrt().domain([0, 200]).range([1, 100]);

  // draw map
  useEffect(() => {
    console.log("drawing map");
    let geoGenerator = d3.geoPath().projection(projection);
    let paths = d3
      .select(mapRef.current)
      .selectAll("path")
      .data(us_geo_data.features)
      .enter()
      .append("path")
      .attr("d", geoGenerator);
  }, []);

  // draw circles
  useEffect(() => {
    console.log("drawing circles");
    d3.selectAll("#tooltip").remove();
    d3.select("#school-svg").selectAll("text").remove();

    let tooltip = d3
      .select(mapRef.current)
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip
      .append("rect")
      .attr("width", 140)
      .attr("height", 24)
      .attr("fill", "black")
      .style("opacity", 0.8);

    tooltip
      .append("text")
      .attr("x", 70)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "Helvetica");

    const teamData = nd_recruit_info.playerData;
    let circles = d3
      .select(mapRef.current)
      .selectAll("circle")
      .data(teamData)
      .enter()
      .append("circle")
      .attr(
        "cx",
        (d) =>
          projection([
            stateCenters[d.state_name].long,
            stateCenters[d.state_name].lat,
          ])[0]
      )
      .attr(
        "cy",
        (d) =>
          projection([
            stateCenters[d.state_name].long,
            stateCenters[d.state_name].lat,
          ])[1]
      )
      .style("fill", (d) => nd_recruit_info.alt_color)
      .style("fill-opacity", (d) => 0.7)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .style("stroke-opacity", 1);

    circles
      .transition()
      .duration(650)
      .attr("r", (d) => rPopScale(d.count));

    let animationFrameId: number | null;

    const handleMouseMove = (
      event: any,
      d: { state_name: any; count: any }
    ) => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        const [xPosition, yPosition] = d3.pointer(event, mapRef.current);

        tooltip.attr("transform", () => {
          if (xPosition + 140 > width)
            return `translate(${xPosition - 140},${yPosition + 10})`;
          else return `translate(${xPosition + 10},${yPosition + 10})`;
        });

        tooltip.select("text").text(`${d.state_name}: ${d.count} player(s)`);
        animationFrameId = null;
      });
    };

    circles
      .on("mouseover", function () {
        d3.select(this).style("stroke-width", 4).style("fill-opacity", 0.9);
        tooltip.style("display", null);
        tooltip.raise();
      })
      .on("mousemove", handleMouseMove)
      .on("mouseout", function () {
        tooltip.style("display", "none");
        d3.select(this).style("stroke-width", 2).style("fill-opacity", 0.7);
      });

    // nodeEnter
    //   .append("svg:image")
    //   .attr("x", -9)
    //   .attr("y", -12)
    //   .attr("width", 20)
    //   .attr("height", 24)
    //   .attr("xlink:href", "resources/images/check.png");

    let schoolLat = nd_recruit_info.lat;
    let schoolLong = nd_recruit_info.lng;
    let schoolCanvasCoords = projection([schoolLong, schoolLat]);
    let schoolX = schoolCanvasCoords[0] - 25;
    let schoolY = schoolCanvasCoords[1] - 25;

    d3.select(mapRef.current)
      .append("svg:image")
      .attr("x", schoolX)
      .attr("y", schoolY)
      .attr("width", "50")
      .attr("height", "50")
      .attr("xlink:href", nd_recruit_info.logo);
    // .attr("id", "schoolLogo");

    // Clean up the event listener on component unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <Grid container sx={outerGridStyle}>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          sx={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#333",
            textAlign: "center",
          }}
        >
          Notre Dame Recruiting Breakdown 2012-2024
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={mapContainerStyle}
        >
          <svg ref={mapRef} width={800} height={600}></svg>
          <Typography
            variant="h1"
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#333",
              textAlign: "center",
            }}
          >
            Geographic Distribution of Notre Dame Recruits
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={mapContainerStyle}
        >
          <svg ref={pieRef} width={800} height={600}></svg>
        </Box>
      </Grid>
    </Grid>
  );
}
