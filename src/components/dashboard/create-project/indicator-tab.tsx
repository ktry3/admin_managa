import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Divider, Grid, IconButton, MenuItem, TextField } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { DataDesignForm } from '@/types/dataDesignForm';
import AccordionContainer from '@/components/accordion';

interface Filter {
  field: string;
  operation: string;
  valueStart?: string;
  valueEnd?: string;
}

interface Indicator {
  name: string;
  description: string;
  filters: Filter[];
}

interface FilterFunction {
  operation: string;
  label: string;
  values: number;
}

interface IndicatorProps {
  indicators: Indicator[];
  setIndicators: React.Dispatch<React.SetStateAction<Indicator[]>>;
  dataDesignForms: DataDesignForm[];
  filterFunctions: {
    array: FilterFunction[];
    date: FilterFunction[];
    number: FilterFunction[];
    string: FilterFunction[];
    time: FilterFunction[];
  } | null;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const IndicatorDesignTab: React.FC<IndicatorProps> = ({ indicators, setIndicators, dataDesignForms, filterFunctions }) => {
  const addIndicator = () => {
    setIndicators([...indicators, { name: '', description: '', filters: [] }]);
  };

  const deleteIndicator = (index: number) => {
    const newIndicators = indicators.filter((_, i) => i !== index);
    setIndicators(newIndicators);
  };

  const addIndicatorFilterAt = (index: number) => {
    const newIndicators = [...indicators];
    newIndicators[index].filters.push({ field: '', operation: '', valueStart: '', valueEnd: '' });
    setIndicators(newIndicators);
  };

  const deleteIndicatorFilterAt = (indicatorIndex: number, filterIndex: number) => {
    const newIndicators = [...indicators];
    newIndicators[indicatorIndex].filters = newIndicators[indicatorIndex].filters.filter((_, i) => i !== filterIndex);
    setIndicators(newIndicators);
  };

  const getFilterFunctions = (field: string) => {
    const form = dataDesignForms.find(f => f.label === field);
    if (form && filterFunctions) {
      const dataType = form.operation as keyof typeof filterFunctions;
      return filterFunctions[dataType] || [];
    }
    return [];
  };

  return (
    <Card elevation={0} sx={{ marginBottom: 2, padding: 2 }}>
      {indicators.map((indicator, indicatorIndex) => (
        <Card elevation={1} key={indicatorIndex} sx={{ marginBottom: 1 }}>
          <AccordionContainer title={`Indicator ${indicatorIndex + 1}`}>
            <Box sx={{ marginBottom: '1rem' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    label='Indicator Name'
                    value={indicator.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newIndicators = [...indicators];
                      newIndicators[indicatorIndex].name = e.target.value;
                      setIndicators(newIndicators);
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    variant='outlined'
                    label='Indicator Description'
                    value={indicator.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newIndicators = [...indicators];
                      newIndicators[indicatorIndex].description = e.target.value;
                      setIndicators(newIndicators);
                    }}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            {indicator.filters.map((filter, filterIndex) => (
              <FilterBox key={filterIndex}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={8}>
                    <TextField
                      select
                      variant='outlined'
                      label='Field'
                      value={filter.field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newIndicators = [...indicators];
                        newIndicators[indicatorIndex].filters[filterIndex].field = e.target.value;
                        newIndicators[indicatorIndex].filters[filterIndex].operation = '';
                        setIndicators(newIndicators);
                      }}
                      fullWidth
                      required>
                      {dataDesignForms.map(form => (
                        <MenuItem key={form.order} value={form.label}>
                          {form.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      variant='outlined'
                      label='Operation'
                      value={filter.operation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newIndicators = [...indicators];
                        newIndicators[indicatorIndex].filters[filterIndex].operation = e.target.value;
                        // Reset valueStart and valueEnd when operation changes
                        newIndicators[indicatorIndex].filters[filterIndex].valueStart = '';
                        newIndicators[indicatorIndex].filters[filterIndex].valueEnd = '';
                        setIndicators(newIndicators);
                      }}
                      fullWidth
                      required>
                      {getFilterFunctions(filter.field).map((operation, index) => (
                        <MenuItem key={index} value={operation.operation}>
                          {operation.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {(() => {
                    const selectedOperation = getFilterFunctions(filter.field).find(op => op.operation === filter.operation);
                    if (!selectedOperation) return null;

                    const form = dataDesignForms.find(f => f.label === filter.field);
                    const isDateOrTime = form?.data_type === 'date' || form?.data_type === 'time';
                    const valueType = form?.data_type === 'date' ? 'date' : form?.data_type === 'time' ? 'time' : 'text';

                    switch (selectedOperation.values) {
                      case 1:
                        return (
                          <Grid item xs={2}>
                            <TextField
                              variant='outlined'
                              type={isDateOrTime ? valueType : 'text'}
                              label='Value Start'
                              value={filter.valueStart}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const newIndicators = [...indicators];
                                newIndicators[indicatorIndex].filters[filterIndex].valueStart = e.target.value;
                                setIndicators(newIndicators);
                              }}
                              fullWidth
                            />
                          </Grid>
                        );
                      case 2:
                        return (
                          <>
                            <Grid item xs={5}>
                              <TextField
                                variant='outlined'
                                type={isDateOrTime ? valueType : 'text'}
                                label='Value Start'
                                value={filter.valueStart}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const newIndicators = [...indicators];
                                  newIndicators[indicatorIndex].filters[filterIndex].valueStart = e.target.value;
                                  setIndicators(newIndicators);
                                }}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={5}>
                              <TextField
                                variant='outlined'
                                type={isDateOrTime ? valueType : 'text'}
                                label='Value End'
                                value={filter.valueEnd}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const newIndicators = [...indicators];
                                  newIndicators[indicatorIndex].filters[filterIndex].valueEnd = e.target.value;
                                  setIndicators(newIndicators);
                                }}
                                fullWidth
                              />
                            </Grid>
                          </>
                        );
                      default:
                        return null;
                    }
                  })()}
                  <Grid item>
                    <IconButton onClick={() => deleteIndicatorFilterAt(indicatorIndex, filterIndex)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </FilterBox>
            ))}
            <Divider className='my-3' />
            <Button onClick={() => addIndicatorFilterAt(indicatorIndex)} startIcon={<Add />}>
              Add Filter
            </Button>
            <Button onClick={() => deleteIndicator(indicatorIndex)} startIcon={<Remove />} color='secondary'>
              Delete Indicator
            </Button>
          </AccordionContainer>
        </Card>
      ))}
      <Button onClick={addIndicator} startIcon={<Add />} color='primary'>
        Add Indicator
      </Button>
      <Button onClick={() => console.log('Question', dataDesignForms)} startIcon={<Add />} color='info'>
        Show Question
      </Button>
      <Button onClick={() => console.log('filter', filterFunctions)} startIcon={<Add />} color='info'>
        Show filter
      </Button>
    </Card>
  );
};

export default IndicatorDesignTab;
