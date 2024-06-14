'use client';
import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  useTheme,
  Box,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';

type RequestNotificationProps = {
  user: string;
  request: string;
  time: string;
  project: string;
};

type Project = {
  id: string;
  name: string;
};

const RequestNotification: React.FC<RequestNotificationProps> = ({ user, request, time, project }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
      <Box className='mr-4'>
        <Avatar>{user[0]}</Avatar>
      </Box>
      <Box>
        <Box>
          <span className='font-bold'>{user}</span> requested to <span className='font-bold'>{request}</span> a record of{' '}
          <span className='font-bold'>{project}</span>.
        </Box>
        <Box className='mb-3'>{time} Hours Ago</Box>
        <Box>
          <Button variant='contained' className='mr-3'>
            Approve
          </Button>
          <Button variant='contained'>Reject</Button>
        </Box>
      </Box>
    </Box>
  );
};

const RequestLogs = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [requestLogs, setRequestLogs] = useState<any[]>([]);

  const fetchProjectData = async () => {
    const response = await axios.get('/api/get-all-project');
    const projects = response?.data?.data?.projects
      .filter((project: any) => project.status === 1)
      .map((project: any) => ({
        id: project.id,
        name: project.name,
      }));
    setAllProjects(projects);
  };

  const fetchRequestLogs = async (id: string) => {
    try {
      const response = await axios.get(`/api/get-pending-request/${id}`);
      console.log(response.data.data);
      setRequestLogs(response.data.data);
    } catch (error) {
      console.error('Error fetching request logs:', error);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const projectId = event.target.value;
    console.log(projectId);
    fetchRequestLogs(projectId);
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <Box className='g-dashboard-boxShadow h-full'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ backgroundColor: theme.palette.primary.main }} className='mr-4'>
            6
          </Avatar>
          <p className='text-xl'>Request Logs</p>
        </Box>
        <Box className='flex items-center'>
          <IconButton onClick={() => setOpenDialog(true)}>
            <FilterAltIcon color='primary' fontSize='large' />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box className='px-[1rem] h-[90vh] overflow-y-scroll'>
        {[1, 2, 3, 4, 5].map(item => (
          <React.Fragment key={item}>
            <RequestNotification
              key={item}
              user='Soth Kimleng'
              request='delete'
              project='ការផ្តល់ថ្នាំបង្ការជាប្រចាំនិងសេវាថែទាំសុខភាពបឋមនៅតំបន់សៀមរាប​ Test'
              time='13'
            />
            <Divider />
          </React.Fragment>
        ))}
      </Box>
      <Dialog fullWidth open={openDialog} onClose={() => setOpenDialog(!openDialog)}>
        <DialogTitle>Select a Project</DialogTitle>
        <DialogContent dividers>
          <FormControl sx={{ minWidth: '100%', marginBottom: 2 }}>
            <InputLabel id='project-filter-label'>Project</InputLabel>
            <Select
              labelId='project-filter-label'
              id='project-filter'
              value={selectedProjectId}
              label='Project'
              onChange={handleFilterChange}>
              {allProjects.map(project => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RequestLogs;
