'use client';
import * as React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarQuickFilter, GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idCard: string;
  role: string;
}

const rows: RowData[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'superAdmin',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'JaneSmith@gmail.com,',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 1',
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'AliceJohnson@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 2',
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'BobSmith@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 3',
  },
  {
    id: 5,
    firstName: 'Eve',
    lastName: 'Anderson',
    email: 'EveAnderson@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 4',
  },
  {
    id: 6,
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'MichaelBrown@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 5',
  },
  {
    id: 7,
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'OliviaDavis@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'client',
  },
  {
    id: 8,
    firstName: 'William',
    lastName: 'Johnson',
    email: 'WilliamJohnson@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 1',
  },
  {
    id: 9,
    firstName: 'Sophia',
    lastName: 'Smith',
    email: 'SophiaSmith@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 2',
  },
  {
    id: 10,
    firstName: 'James',
    lastName: 'Anderson',
    email: 'JamesAnderson@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 3',
  },
  {
    id: 11,
    firstName: 'Emma',
    lastName: 'Brown',
    email: 'EmmaBrown@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 4',
  },
  {
    id: 12,
    firstName: 'Liam',
    lastName: 'Davis',
    email: 'LiamDavis@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 5',
  },
  {
    id: 13,
    firstName: 'Ava',
    lastName: 'Johnson',
    email: 'AvaJohnson@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'client',
  },
  {
    id: 14,
    firstName: 'Noah',
    lastName: 'Smith',
    email: 'NoahSmith@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'superAdmin',
  },
  {
    id: 15,
    firstName: 'Isabella',
    lastName: 'Anderson',
    email: 'IsabellaAnderson@gmail.com',
    phone: '123456789',
    idCard: '123456789',
    role: 'level 1',
  },
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
      <ManageAccountsIcon />
    </Button>
    <Button
      variant='contained'
      color='secondary'
      sx={{ borderRadius: '28px', margin: '0 0.5rem' }}
      onClick={() => handleDelete(row)}>
      <DeleteIcon />
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

const DataTableWithSearch: React.FC = () => {
  const columns: GridColDef[] = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID', cellClassName: 'text-left', flex: 0.3 },
      { field: 'firstName', headerName: 'First Name', cellClassName: 'text-left', flex: 0.8 },
      { field: 'lastName', headerName: 'Last Name', cellClassName: 'text-left', flex: 0.8 },
      {
        field: 'email',
        headerName: 'Email',
        cellClassName: 'text-left',
        headerAlign: 'left',
        flex: 1.2,
      },
      { field: 'phone', headerName: 'Phone', cellClassName: 'text-left', flex: 0.8 },
      {
        field: 'idCard',
        headerName: 'Id Card',
        cellClassName: 'text-left',
        flex: 0.8,
      },
      {
        field: 'role',
        headerName: 'Role',
        cellClassName: 'text-left',
        flex: 0.8,
        renderCell: (params: GridRenderCellParams<RowData>) => (
          <Box>
            <span className='bg-[rgba(0,0,0,0.1)] px-[0.8rem] py-[0.5rem] rounded-[24px]'>{params.value}</span>
          </Box>
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1.2,
        renderCell: (params: GridRenderCellParams<RowData>) => <ActionCell row={params.row} />,
      },
    ],
    [],
  );

  return (
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
  );
};

export default DataTableWithSearch;
