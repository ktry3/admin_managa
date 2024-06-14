'use client';
import * as React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarQuickFilter, GridRenderCellParams } from '@mui/x-data-grid';

interface RowData {
  id: number;
  roleName: string;
  roleDescription: string;
}

const rows: RowData[] = [
  { id: 1, roleName: 'Leader', roleDescription: 'operational district project office' },
  { id: 2, roleName: 'Level 1', roleDescription: 'description for Level 1' },
  { id: 3, roleName: 'Level 2', roleDescription: 'description for Level 2' },
  { id: 4, roleName: 'Level 3', roleDescription: 'description for Level 3' },
  { id: 5, roleName: 'Level 4', roleDescription: 'description for Level 4' },
  { id: 6, roleName: 'Level 5', roleDescription: 'description for Level 5' },
  { id: 7, roleName: 'Dashboard Manager', roleDescription: 'description for Dashboard Manager' },
  { id: 8, roleName: 'Role 1', roleDescription: 'description for Role 1' },
  { id: 9, roleName: 'Role 2', roleDescription: 'description for Role 2' },
  { id: 10, roleName: 'Role 3', roleDescription: 'description for Role 3' },
  { id: 11, roleName: 'Role 4', roleDescription: 'description for Role 4' },
  { id: 12, roleName: 'Role 5', roleDescription: 'description for Role 5' },
  { id: 13, roleName: 'Role 6', roleDescription: 'description for Role 6' },
  { id: 14, roleName: 'Role 7', roleDescription: 'description for Role 7' },
  { id: 15, roleName: 'Role 8', roleDescription: 'description for Role 8' },
  { id: 16, roleName: 'Role 9', roleDescription: 'description for Role 9' },
  { id: 17, roleName: 'Role 10', roleDescription: 'description for Role 10' },
  { id: 18, roleName: 'Role 11', roleDescription: 'description for Role 11' },
  { id: 19, roleName: 'Role 12', roleDescription: 'description for Role 12' },
  { id: 20, roleName: 'Role 13', roleDescription: 'description for Role 13' },
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
      <EditIcon />
    </Button>
    <Button
      variant='contained'
      color='secondary'
      sx={{ borderRadius: '28px', margin: '0 0.5rem' }}
      onClick={() => handleDelete(row)}>
      <DeleteIcon />
    </Button>
    <Button variant='contained' color='info' sx={{ borderRadius: '28px' }} onClick={() => handleDelete(row)}>
      <RemoveRedEyeIcon />
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

const UserManagementRolePage = () => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID', cellClassName: 'text-left', flex: 0.3 },
      { field: 'roleName', headerName: 'Role Name', cellClassName: 'text-left', flex: 1 },
      { field: 'roleDescription', headerName: 'Role Description', cellClassName: 'text-left', headerAlign: 'left', flex: 3 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params: GridRenderCellParams<RowData>) => <ActionCell row={params.row} />,
      },
    ],
    [],
  );

  return (
    <Grid container className='w-full h-full'>
      <Grid item xs={12}>
        <Box className='flex justify-between items-center'>
          <h2>Role</h2>
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

export default UserManagementRolePage;
