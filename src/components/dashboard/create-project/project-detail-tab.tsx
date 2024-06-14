'use client';
import { Box, Grid, TextField } from '@mui/material';
import React from 'react';

interface ProjectDetailTabProps {
  projectTitle: string;
  setProjectTitle: (title: string) => void;
  projectDescription: string;
  setProjectDescription: (description: string) => void;
}

const ProjectDetailTab: React.FC<ProjectDetailTabProps> = ({
  projectTitle,
  setProjectTitle,
  projectDescription,
  setProjectDescription,
}) => {
  return (
    <Box component='form'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id='outlined-required'
            label='Project Title'
            className='w-full'
            helperText='Please specify the title for the project'
            value={projectTitle}
            onChange={e => setProjectTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            rows={6}
            className='w-full'
            id='outlined-multiline-static'
            label='Project Description'
            multiline
            helperText='Please specify the description for the project'
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetailTab;
