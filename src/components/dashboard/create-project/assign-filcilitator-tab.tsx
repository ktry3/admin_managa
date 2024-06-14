import React from 'react';
import { Grid, FormControl, Select, InputLabel, MenuItem, Box, Chip, SelectChangeEvent } from '@mui/material';
import usePersistentState from '@/hooks/usePersistentState';

interface User {
  id: string;
  name: string;
}

const userList: User[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'John Smith' },
  { id: '3', name: 'Jane Doe' },
  { id: '4', name: 'Jane Smith' },
  { id: '5', name: 'Michael Johnson' },
  { id: '6', name: 'Emily Davis' },
];

interface AssignFacilitatorTabProps {
  facilitators: User[];
  setFacilitators: React.Dispatch<React.SetStateAction<User[]>>;
}

const AssignFacilitatorTab: React.FC<AssignFacilitatorTabProps> = ({ facilitators, setFacilitators }) => {
  const [selectedUsers, setSelectedUsers] = usePersistentState<User[]>('selectedUsers', []);

  const handleUserChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    const selected = userList.filter(user => value.includes(user.id));
    setSelectedUsers(selected);
    setFacilitators(selected);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel id='user-filter-label'>Users</InputLabel>
          <Select
            labelId='user-filter-label'
            id='users-filter'
            multiple
            variant='standard'
            value={selectedUsers.map(user => user.id)}
            onChange={handleUserChange}
            renderValue={selectedIds => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedUsers.map(user => (
                  <Chip key={user.id} label={user.name} />
                ))}
              </Box>
            )}>
            {userList.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AssignFacilitatorTab;
