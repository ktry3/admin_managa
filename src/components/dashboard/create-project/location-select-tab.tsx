'use client';

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { SelectedLocations, Location } from '@/types/locations';
import usePersistentState from '@/hooks/usePersistentState';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface LocationSelectionTabsProps {
  selectedLocations: SelectedLocations;
  setSelectedLocations: React.Dispatch<React.SetStateAction<SelectedLocations>>;
  provinces: Location[];
  districts: Record<string, Location[]>;
  communes: Record<string, Location[]>;
  villages: Record<string, Location[]>;
}

const LocationSelectionTabs: React.FC<LocationSelectionTabsProps> = ({
  selectedLocations,
  setSelectedLocations,
  provinces,
  districts,
  communes,
  villages,
}) => {
  const [value, setValue] = usePersistentState('locationTabValue', 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSelectProvince = (provinceId: string) => {
    setSelectedLocations(prev => ({
      ...prev,
      provinces: prev.provinces.includes(provinceId)
        ? prev.provinces.filter(id => id !== provinceId)
        : [...prev.provinces, provinceId],
    }));
  };

  const handleSelectDistrict = (provinceId: string, districtId: string) => {
    setSelectedLocations(prev => ({
      ...prev,
      districts: prev.districts.includes(districtId)
        ? prev.districts.filter(id => id !== districtId)
        : [...prev.districts, districtId],
    }));
  };

  const handleSelectCommune = (districtId: string, communeId: string) => {
    setSelectedLocations(prev => ({
      ...prev,
      communes: prev.communes.includes(communeId) ? prev.communes.filter(id => id !== communeId) : [...prev.communes, communeId],
    }));
  };

  const handleSelectVillage = (communeId: string, villageId: string) => {
    setSelectedLocations(prev => ({
      ...prev,
      villages: prev.villages.includes(villageId) ? prev.villages.filter(id => id !== villageId) : [...prev.villages, villageId],
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}>
        <Tab label='Provinces' {...a11yProps(0)} />
        <Tab label='Districts' {...a11yProps(1)} />
        <Tab label='Communes' {...a11yProps(2)} />
        <Tab label='Villages' {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FormGroup>
          {provinces.map(province => (
            <FormControlLabel
              key={province.id}
              control={
                <Checkbox
                  checked={selectedLocations.provinces.includes(province.id)}
                  onChange={() => handleSelectProvince(province.id)}
                />
              }
              label={province.name_en}
            />
          ))}
        </FormGroup>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {selectedLocations.provinces.map(provinceId => {
          const province = provinces.find(p => p.id === provinceId);
          return (
            <Box key={provinceId}>
              <Typography variant='h6'>{province?.name_en || 'Unknown'}</Typography>
              <FormGroup>
                {districts[provinceId]?.map(district => (
                  <FormControlLabel
                    key={district.id}
                    control={
                      <Checkbox
                        checked={selectedLocations.districts.includes(district.id)}
                        onChange={() => handleSelectDistrict(provinceId, district.id)}
                      />
                    }
                    label={district.name_en}
                  />
                ))}
              </FormGroup>
            </Box>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {selectedLocations.districts.map(districtId => {
          const provinceId = Object.keys(districts).find(pid => districts[pid].some(d => d.id === districtId));
          const district = districts[provinceId!]?.find(d => d.id === districtId);
          return (
            <Box key={districtId}>
              <Typography variant='h6'>{district?.name_en || 'Unknown'}</Typography>
              <FormGroup>
                {communes[districtId]?.map(commune => (
                  <FormControlLabel
                    key={commune.id}
                    control={
                      <Checkbox
                        checked={selectedLocations.communes.includes(commune.id)}
                        onChange={() => handleSelectCommune(districtId, commune.id)}
                      />
                    }
                    label={commune.name_en}
                  />
                ))}
              </FormGroup>
            </Box>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {selectedLocations.communes.map(communeId => {
          const districtId = Object.keys(communes).find(did => communes[did].some(c => c.id === communeId));
          const commune = communes[districtId!]?.find(c => c.id === communeId);
          return (
            <Box key={communeId}>
              <Typography variant='h6'>{commune?.name_en || 'Unknown'}</Typography>
              <FormGroup>
                {villages[communeId]?.map(village => (
                  <FormControlLabel
                    key={village.id}
                    control={
                      <Checkbox
                        checked={selectedLocations.villages.includes(village.id)}
                        onChange={() => handleSelectVillage(communeId, village.id)}
                      />
                    }
                    label={village.name_en}
                  />
                ))}
              </FormGroup>
            </Box>
          );
        })}
      </TabPanel>
    </Box>
  );
};

export default LocationSelectionTabs;
