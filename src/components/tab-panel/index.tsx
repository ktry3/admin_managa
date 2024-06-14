'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Grid, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageCard from '../landingPage/ImageCard';

const tabHeaders = [
  { title: 'Tab 1', content: '' },
  { title: 'Tab 2', content: '' },
  { title: 'Tab 3', content: '' },
];

type TabsProps = {
  children?: React.ReactNode;
  tabs?: string[];
};

const Tabs = (props: TabsProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    console.log('Tab index', index);
  };

  return (
    <Grid container className='g-padding' spacing={8}>
      {/* <Grid container item spacing={1}>
        {tabHeaders.map((tab, index) => (
          <Grid item key={index}>
            <Button variant='contained' onClick={() => handleTabChange(index)}>
              {tab.title}
            </Button>
          </Grid>
        ))}
      </Grid> */}
      <Grid item xs={12}>
        <ImageCard
          mainImageShadow
          mainImage='/dist/images/paragone-web.png'
          description='“<b>Creating a first-of-its-kind video platform as a startup is a near impossible task without partners that are not only tremendously talented, but have the same forward thinking as you do. DigitalOcean has helped us go from architecture to launch by pairing us with strategic partners who are like-minded and innovative.</b>”'
          avatar='/dist/images/ceo.jpg'
          name='Ray Vicheaphalkun'
          title='Founder and CEO, SKME'
          buttonText='Read More'
          buttonArrow
        />
      </Grid>
    </Grid>
  );
};

export default Tabs;
