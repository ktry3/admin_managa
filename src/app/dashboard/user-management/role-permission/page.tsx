'use client';
import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  SelectChangeEvent,
  Button,
  ListItemText,
  Checkbox,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, list: readonly string[], theme: Theme) {
  return {
    fontWeight: list.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const roleSelectList = ['Admin', 'User', 'Guest', 'level 1', 'level 2', 'level 3', 'level 3', 'level 4', 'level 5'];
const permissionGroupList = ['MobileWeb', 'ProjectSetup', 'UserManagement', 'RolePermission', 'Dashboard', 'Reports', 'Settings'];
const permissionList = ['Create', 'Read', 'Update', 'Delete', 'Approve', 'Reject', 'View', 'Edit', 'Modify', 'Submit', 'Cancel'];

const UserManagementRolePermissionPage = () => {
  const theme = useTheme();
  const [roles, setRoles] = useState<string[]>([]);
  const [permissionGroups, setPermissionGroups] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isApply, setApply] = useState<boolean>(false);

  const handleRoleChange = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    setRoles(typeof value === 'string' ? value.split(',') : value);
  };

  const handlePermissionGroupChange = (event: SelectChangeEvent<typeof permissionGroups>) => {
    const {
      target: { value },
    } = event;
    setPermissionGroups(typeof value === 'string' ? value.split(',') : value);
  };

  const handlePermissionChange = (event: SelectChangeEvent<typeof permissions>) => {
    const {
      target: { value },
    } = event;
    setPermissions(typeof value === 'string' ? value.split(',') : value);
  };

  const handleOnApply = () => {
    if (roles.length > 0 && permissionGroups.length > 0) {
      setApply(true);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2>Role Permission</h2>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel id='project-filter-label'>Status</InputLabel>
          <Select
            labelId='project-filter-label'
            id='roles-filter'
            multiple
            value={roles}
            label='Last Name'
            onChange={handleRoleChange}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}>
            {roleSelectList.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, roleSelectList, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel id='project-filter-label'>Status</InputLabel>
          <Select
            labelId='project-filter-label'
            id='roles-filter'
            multiple
            value={permissionGroups}
            label='Last Name'
            onChange={handlePermissionGroupChange}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}>
            {permissionGroupList.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, permissionGroupList, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            className='btn'
            variant='contained'
            onClick={() => handleOnApply()}
            sx={{ fontSize: '1rem', textTransform: 'capitalize' }}>
            Apply
          </Button>
        </Box>
      </Grid>
      {isApply && (
        <React.Fragment>
          <Grid item xs={12}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id='demo-multiple-checkbox-label'>Permissions</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                value={permissions}
                onChange={handlePermissionChange}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}>
                {permissionList.map(name => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={permissions.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className='btn'
                variant='contained'
                onClick={() => handleOnApply()}
                sx={{ fontSize: '1rem', textTransform: 'capitalize' }}>
                Update Role Permission
              </Button>
            </Box>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

export default UserManagementRolePermissionPage;
