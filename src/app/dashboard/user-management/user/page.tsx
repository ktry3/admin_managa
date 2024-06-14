import { Button, Box, Grid } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DataTableWithSearch from '@/components/dashboard/data-table-filter/search-table';

const UserManagementUserPage = () => {
  return (
    <Grid container className='w-full h-full'>
      <Grid item xs={12}>
        <Box className='flex justify-between items-center'>
          <h2>Users</h2>
          <div>
            <Button variant='contained' startIcon={<PersonAddIcon />} sx={{ borderRadius: '14px', fontSize: '1rem' }}>
              Create User
            </Button>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ width: '100%', height: '100%' }}>
        <DataTableWithSearch />
      </Grid>
    </Grid>
  );
};

export default UserManagementUserPage;
