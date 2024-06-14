"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { PieChart, PieChartProps } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { StackedBarChart } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

type dataType = {
  label: string;
  value: number;
  color: string;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const fetchProjectLocations = async () => {
  const response = await axios.get("/api/get-total-project-location");
  return response.data.data.map((item: { value: string; freq: number }) => ({
    label: item.value,
    value: item.freq,
    color: getRandomColor(),
  }));
};

const PieChartCard = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<dataType[]>({
    queryKey: ["projectLocations"],
    queryFn: fetchProjectLocations,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    const pieChartProps: PieChartProps = {
      series: [
        {
          id: "sync",
          data: [
            { value: 3, label: "A", id: "A" },
            { value: 4, label: "B", id: "B" },
            { value: 1, label: "C", id: "C" },
            { value: 6, label: "D", id: "D" },
            { value: 5, label: "E", id: "E" },
          ],
          highlightScope: { highlighted: "item", faded: "global" },
        },
      ],
      height: 400,
      slotProps: {
        legend: {
          hidden: true,
        },
      },
    };
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h3" color="error">
          Failed to load data
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography component="h3">Free Plan Tenant</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <BarChart {...barChartsProps} />
        </Grid>
        <Grid item xs={6}>
          <PieChart {...pieChartProps} />
        </Grid>
      </Grid>
    </Box>
  );
};

const barChartsProps: BarChartProps = {
  series: [
    {
      data: [3, 4, 1],
      id: "sync",
      highlightScope: { highlighted: "item", faded: "global" },
    },
  ],
  xAxis: [{ scaleType: "band", data: ["A", "B", "C"] }],
  height: 300,
  slotProps: {
    legend: {
      hidden: true,
    },
  },
};

const pieChartProps: PieChartProps = {
  series: [
    {
      id: "sync",
      data: [
        { value: 3, label: "A", id: "A" },
        { value: 4, label: "B", id: "B" },
        { value: 1, label: "C", id: "C" },
      ],
      highlightScope: { highlighted: "item", faded: "global" },
    },
  ],
  height: 300,
  slotProps: {
    legend: {
      hidden: true,
    },
  },
};

export default PieChartCard;
