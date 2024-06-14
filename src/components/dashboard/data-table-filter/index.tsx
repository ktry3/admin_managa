'use client';
import axios from 'axios';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Box, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

type NameCounterCardProps = {
  name: string;
  count: number;
  bgColor?: string;
  borderLeftColor?: string;
  isLoading: any;
} & React.HTMLAttributes<HTMLDivElement>;

const NameCounterCard: React.FC<NameCounterCardProps> = ({
  name,
  count,
  bgColor = 'rgba(149, 149, 149, 0.08)',
  borderLeftColor = 'rgb(149, 149, 149)',
  isLoading,
  ...rest
}) => {
  return isLoading ? (
    <Skeleton variant='rectangular' width='100%' height={100} />
  ) : (
    <Box
      sx={{
        borderRadius: '4px',
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `6px solid ${borderLeftColor}`,
        background: bgColor,
        cursor: 'pointer',
      }}
      {...rest}
      className='g-dashboard-boxShadow'>
      <div>{name}</div>
      <div className='flex justify-end text-2xl font-semibold'>{count}</div>
    </Box>
  );
};

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Project', flex: 1.5, cellClassName: 'text-left' },
  { field: 'description', headerName: 'Description', flex: 3, cellClassName: 'leftAlign' },
  { field: 'total_response', headerName: 'Responses', flex: 0.7, cellClassName: 'text-left', headerAlign: 'left' },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    flex: 0.7,
    renderCell: (params: any) => {
      let backgroundColor;
      let textColor;
      let textStatus;

      switch (params.value) {
        case 0:
          backgroundColor = 'rgba(255, 0, 0, 0.1)';
          textColor = 'red';
          textStatus = 'Inactive';
          break;
        case 1:
          backgroundColor = 'rgba(0, 255, 0, 0.1)';
          textColor = 'green';
          textStatus = 'Active';
          break;
        case 2:
          backgroundColor = 'rgba(77,171,245,0.1)';
          textColor = 'rgb(77,171,245)';
          textStatus = 'Completed';
          break;
        default:
          backgroundColor = 'rgba(0, 0, 0, 0.1)';
          textColor = 'rgb(77,171,245)';
          textStatus = 'Not Set';
          break;
      }

      return (
        <Box>
          <Box component='span' sx={{ backgroundColor, color: textColor, borderRadius: '24px', padding: '0.3rem 0.8rem' }}>
            {textStatus}
          </Box>
        </Box>
      );
    },
  },
];

type rowsDateType = {
  id: string;
  name: string;
  status: number;
  description: string;
  total_response: number;
};

const fetchProjectSummary = async () => {
  const res = await axios.get('/api/project-summary');
  return res.data.data;
};

export default function TableDataFilteringSelect() {
  const [itemFilter, setItemFilter] = React.useState<string>('');

  const {
    data: rowData = [],
    isLoading,
    isError,
  } = useQuery<rowsDateType[]>({
    queryKey: ['projectSummary'],
    queryFn: fetchProjectSummary,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setItemFilter(event.target.value);
  };

  const filteredRows = Array.isArray(rowData)
    ? rowData.filter((row: rowsDateType) => {
        if (itemFilter) {
          return row.status.toString() === itemFilter;
        }
        return true;
      })
    : [];

  const projectStatus = Array.isArray(rowData) ? Array.from(new Set(rowData.map(row => row.status))) : [];

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return 'Inactive';
      case 1:
        return 'Active';
      case 2:
        return 'Completed';
      default:
        return 'Not Set';
    }
  };

  // if (isLoading) {
  //   return <Box>Loading...</Box>;
  // }

  if (isError) {
    return <Box>Error loading data</Box>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <NameCounterCard
          name='Total Projects'
          count={Array.isArray(rowData) ? rowData.length : 0}
          borderLeftColor='rgb(149, 149, 149)'
          bgColor='rgba(149, 149, 149, 0.08)'
          onClick={() => setItemFilter('')}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={3}>
        <NameCounterCard
          name='Active Projects'
          count={Array.isArray(rowData) ? rowData.filter(row => row.status === 1).length : 0}
          borderLeftColor='rgb(149, 149, 149)'
          bgColor='rgba(0, 150, 136, 0.08)'
          onClick={() => setItemFilter('1')}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={3}>
        <NameCounterCard
          name='Inactive Projects'
          count={Array.isArray(rowData) ? rowData.filter(row => row.status === 0).length : 0}
          borderLeftColor='rgb(217, 0, 0)'
          bgColor='rgba(217, 0, 0, 0.08)'
          onClick={() => setItemFilter('0')}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={3}>
        <NameCounterCard
          name='Completed Projects'
          count={Array.isArray(rowData) ? rowData.filter(row => row.status === 2).length : 0}
          borderLeftColor='rgb(70, 165, 255)'
          bgColor='rgba(70, 165, 255, 0.08)'
          onClick={() => setItemFilter('2')}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ height: 'fit-content', width: '100%' }} className='g-dashboard-boxShadow p-[1rem]'>
          <Box className='flex justify-between items-center'>
            <Box>
              <p>List of Projects</p>
            </Box>
            <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
              <InputLabel id='project-filter-label'>Status</InputLabel>
              <Select
                labelId='project-filter-label'
                id='project-filter'
                value={itemFilter}
                label='Status'
                onChange={handleFilterChange}>
                <MenuItem value=''>
                  <em>All</em>
                </MenuItem>
                {projectStatus.map((item, index) => (
                  <MenuItem key={index} value={item.toString()}>
                    {getStatusLabel(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <DataGrid
            loading={isLoading}
            columns={columns}
            rows={filteredRows}
            getRowId={row => row.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            sx={{ border: 'none', height: 'fit-content' }}
            density='compact'
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>
    </Grid>
  );
}
