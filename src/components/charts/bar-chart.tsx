'use client';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type dataType = {
  label: string;
  value: number;
  color: string;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const fetchProjectLocations = async () => {
  const response = await axios.get('/api/get-total-project-location');
  return response.data.data.map((item: { value: string; freq: number }) => ({
    label: item.value,
    value: item.freq,
    color: getRandomColor(),
  }));
};

const chartSetting = {
  xAxis: [
    {
      label: 'Responses',
    },
  ],
  width: 500,
  height: 400,
};

const BarChartCard = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<dataType[]>({
    queryKey: ['projectLocations'],
    queryFn: fetchProjectLocations,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h3'>Responses in each Province</Typography>
        <Skeleton variant='rounded' width={350} height={350} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h3' color='error'>
          Failed to load data
        </Typography>
      </Box>
    );
  }

  // Prepare the dataset for the BarChart
  const dataset = data.map(item => ({
    province: item.label,
    responses: item.value,
  }));

  const valueFormatter = (value: number | null) => `${value}`;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography component='h3'>Responses in each Province</Typography>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'province' }]}
        series={[{ dataKey: 'responses', label: 'Responses', valueFormatter }]}
        layout='horizontal'
        {...chartSetting}
      />
    </Box>
  );
};

export default BarChartCard;
