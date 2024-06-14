'use client';
import * as React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarQuickFilter, GridRenderCellParams } from '@mui/x-data-grid';

interface RowData {
  id: number;
  name: string;
  status: string;
  isStarted: string;
  createdAt: string;
}

const rows: RowData[] = [
  { id: 1, name: 'Project 1', status: 'Active', isStarted: 'Yes', createdAt: '2021-10-01, 11:44:43 AM' },
  { id: 2, name: 'Project 2', status: 'Active', isStarted: 'Yes', createdAt: '2021-10-02, 10:30:15 AM' },
  { id: 3, name: 'Project 3', status: 'Inactive', isStarted: 'No', createdAt: '2021-09-30, 03:20:00 PM' },
  { id: 4, name: 'Project 4', status: 'Completed', isStarted: 'Yes', createdAt: '2021-10-03, 09:15:30 AM' },
  { id: 5, name: 'Project 5', status: 'Inactive', isStarted: 'No', createdAt: '2021-10-01, 02:45:10 PM' },
  { id: 6, name: 'Project 6', status: 'Active', isStarted: 'Yes', createdAt: '2021-10-04, 08:00:00 AM' },
  { id: 7, name: 'Project 7', status: 'Completed', isStarted: 'No', createdAt: '2021-10-02, 01:10:20 PM' },
  { id: 8, name: 'Project 8', status: 'Active', isStarted: 'Yes', createdAt: '2021-10-05, 11:30:45 AM' },
  { id: 9, name: 'Project 9', status: 'Inactive', isStarted: 'No', createdAt: '2021-10-03, 04:55:30 PM' },
  { id: 10, name: 'Project 10', status: 'Active', isStarted: 'Yes', createdAt: '2021-10-06, 10:00:00 AM' },
  { id: 11, name: 'Project 11', status: 'Inactive', isStarted: 'No', createdAt: '2021-10-04, 03:30:15 PM' },
];

const handleEdit = (row: RowData) => {
  console.log('Edit user:', row);
};

const handleDelete = (row: RowData) => {
  console.log('Delete user:', row);
};

const ActionCell: React.FC<{ row: RowData }> = ({ row }) => (
  <div>
    <Button variant='contained' color='primary' sx={{ borderRadius: '28px' }} onClick={() => handleEdit(row)}>
      <SystemUpdateAltIcon />
    </Button>
    <Button
      variant='contained'
      color='warning'
      sx={{ borderRadius: '28px', margin: '0 0.5rem' }}
      onClick={() => handleDelete(row)}>
      <EditIcon />
    </Button>
    <Button
      variant='contained'
      color='success'
      sx={{ borderRadius: '28px', margin: '0 0.5rem' }}
      onClick={() => handleDelete(row)}>
      <StopCircleIcon />
    </Button>
    <Button
      variant='contained'
      color='secondary'
      sx={{ borderRadius: '28px', margin: '0 0.5rem' }}
      onClick={() => handleDelete(row)}>
      <DeleteIcon />
    </Button>
    <Button variant='contained' color='info' sx={{ borderRadius: '28px' }} onClick={() => handleDelete(row)}>
      <FileCopyIcon />
    </Button>
  </div>
);

const CustomQuickFilter = styled(GridToolbarQuickFilter)(({ theme }) => ({
  width: '100%',
  padding: '1rem 0',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem !important',
    color: theme.palette.primary.main,
  },
  '& .MuiInputBase-input': {
    fontSize: '1.5rem !important',
  },
}));

const CustomToolbar: React.FC = () => (
  <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <CustomQuickFilter />
  </GridToolbarContainer>
);

const ProjectHistoryPage = () => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID', cellClassName: 'text-left', flex: 0.4 },
      { field: 'name', headerName: 'Name', cellClassName: 'text-left', flex: 1 },
      {
        field: 'status',
        headerName: 'Status',
        cellClassName: 'text-left',
        flex: 0.8,
        renderCell: (params: any) => {
          let backgroundColor;
          let textColor;

          switch (params.value) {
            case 'Active':
              backgroundColor = 'rgba(0, 255, 0, 0.1)';
              textColor = 'green';
              break;
            case 'Inactive':
              backgroundColor = 'rgba(255, 0, 0, 0.1)';
              textColor = 'red';
              break;
            case 'Completed':
              backgroundColor = 'rgba(77,171,245,0.1)';
              textColor = 'rgb(77,171,245)';
              break;
            default:
              backgroundColor = 'rgba(0, 0, 0, 0.1)';
              textColor = 'rgb(77,171,245)';
              break;
          }

          return (
            <Box>
              <Box component='span' sx={{ backgroundColor, color: textColor, borderRadius: '24px', padding: '0.3rem 0.8rem' }}>
                {params.value}
              </Box>
            </Box>
          );
        },
      },
      {
        field: 'isStarted',
        headerName: 'Data Collection Begun',
        cellClassName: 'text-left',
        flex: 1,
        renderCell: (params: any) => {
          if (params.value === undefined) return;

          let backgroundColor;
          let textColor;

          switch (params.value) {
            case 'Yes':
              backgroundColor = 'rgba(0, 255, 0, 0.1)';
              textColor = 'green';
              break;
            case 'No':
              backgroundColor = 'rgba(255, 0, 0, 0.1)';
              textColor = 'red';
              break;

            default:
              backgroundColor = 'rgba(0, 0, 0, 0.1)';
              textColor = 'rgb(77,171,245)';
              break;
          }

          return (
            <Box>
              <Box component='span' sx={{ backgroundColor, color: textColor, borderRadius: '24px', padding: '0.3rem 0.8rem' }}>
                {params.value}
              </Box>
            </Box>
          );
        },
      },
      { field: 'createdAt', headerName: 'Created At', cellClassName: 'text-left', flex: 1.2 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 2,
        renderCell: (params: GridRenderCellParams<RowData>) => <ActionCell row={params.row} />,
      },
    ],
    [],
  );

  return (
    <Grid container className='w-full h-full'>
      <Grid item xs={12}>
        <Box className='flex justify-between items-center'>
          <h2>Project History</h2>
          <div>
            <Button
              variant='contained'
              startIcon={<AddCircleOutlineOutlinedIcon />}
              sx={{ borderRadius: '14px', fontSize: '1rem' }}>
              Create Role
            </Button>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ width: '100%', height: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterValues: [''],
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          autoHeight
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          pageSizeOptions={[10]}
          sx={{ width: '100%', height: '100%' }}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectHistoryPage;
