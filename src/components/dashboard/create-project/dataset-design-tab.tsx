'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Grid, Box, TextField, MenuItem, Radio, Checkbox, Divider, IconButton, Button, Typography } from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import AccordionContainer from '@/components/accordion';

import { DataDesignForm, questionTypes } from '@/types/dataDesignForm';

interface DatasetDesignTabProps {
  dataDesignForms: DataDesignForm[];
  setDataDesignForms: React.Dispatch<React.SetStateAction<DataDesignForm[]>>;
}

const DatasetDesignTab: React.FC<DatasetDesignTabProps> = ({ dataDesignForms, setDataDesignForms }) => {
  useEffect(() => {
    if (dataDesignForms.length === 0) {
      handleAddForm();
    }
  }, [dataDesignForms]);

  const handleQuestionTypeChange = useCallback(
    (formIndex: number, value: string) => {
      setDataDesignForms(prevForms => {
        const newForms = [...prevForms];
        const selectedType = questionTypes.find(option => option.questionType === value);
        newForms[formIndex].type = selectedType?.questionType || '';
        newForms[formIndex].data_type = selectedType?.dataTypes[0]?.type || '';
        newForms[formIndex].operation = selectedType?.operationFilter || '';
        return newForms;
      });
    },
    [setDataDesignForms],
  );

  const handleDataTypeChange = useCallback(
    (formIndex: number, value: string) => {
      setDataDesignForms(prevForms => {
        const newForms = [...prevForms];
        newForms[formIndex].data_type = value;
        return newForms;
      });
    },
    [setDataDesignForms],
  );

  const handleAddForm = useCallback(() => {
    setDataDesignForms(prevForms => [
      ...prevForms,
      { order: prevForms.length + 1, label: '', type: '', data_type: '', isRequired: false, options: [], operation: '' },
    ]);
  }, [setDataDesignForms]);

  const handleRemoveForm = useCallback(
    (formIndex: number) => {
      setDataDesignForms(prevForms => prevForms.filter((_, index) => index !== formIndex));
    },
    [setDataDesignForms],
  );

  const handleAddOption = useCallback(
    (formIndex: number) => {
      setDataDesignForms(prevForms => {
        const newForms = [...prevForms];
        newForms[formIndex].options.push('');
        return newForms;
      });
    },
    [setDataDesignForms],
  );

  const handleRemoveOption = useCallback(
    (formIndex: number, optionIndex: number) => {
      setDataDesignForms(prevForms => {
        const newForms = [...prevForms];
        newForms[formIndex].options = newForms[formIndex].options.filter((_, index) => index !== optionIndex);
        return newForms;
      });
    },
    [setDataDesignForms],
  );

  const handleInputChange = useCallback(
    (formIndex: number, event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>) => {
      const { name, value } = event.target;
      setDataDesignForms(prevForms => {
        const newForms = [...prevForms];
        if (name === 'label') {
          newForms[formIndex].label = value as string;
        } else if (name === 'data_type') {
          handleDataTypeChange(formIndex, value as string);
        }
        return newForms;
      });
    },
    [handleDataTypeChange, setDataDesignForms],
  );

  return (
    <Box sx={{ padding: 2 }}>
      {dataDesignForms.length === 0 ? (
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          No forms available. Please add a form to get started.
        </Typography>
      ) : (
        <Grid container spacing={1}>
          {dataDesignForms.map((form, formIndex) => (
            <Grid item xs={12} key={form.order}>
              <AccordionContainer title={`Question ${form.order}`}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label='Question'
                      name='label'
                      value={form.label}
                      onChange={event => handleInputChange(formIndex, event)}
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      select
                      label='Question Type'
                      value={form.type}
                      onChange={event => handleQuestionTypeChange(formIndex, event.target.value)}
                      required>
                      {questionTypes.map(option => (
                        <MenuItem key={option.questionType} value={option.questionType}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      select
                      label='Data Type'
                      name='data_type'
                      value={form.data_type}
                      onChange={event => handleInputChange(formIndex, event)}
                      disabled={!form.type}
                      required>
                      {questionTypes
                        .find(q => q.questionType === form.type)
                        ?.dataTypes.map(option => (
                          <MenuItem key={option.type} value={option.type}>
                            {option.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  {form.type === 'short_answer' && (
                    <Grid item xs={12}>
                      <TextField fullWidth label='Short Answer' disabled />
                    </Grid>
                  )}
                  {form.type === 'paragraph' && (
                    <Grid item xs={12}>
                      <TextField fullWidth label='Paragraph' multiline rows={4} disabled />
                    </Grid>
                  )}
                  {form.type === 'multiple_choice' && (
                    <Grid item xs={12}>
                      {form.options.map((option, optionIndex) => (
                        <Grid container spacing={2} alignItems='center' key={optionIndex}>
                          <Grid item>
                            <Radio disabled />
                          </Grid>
                          <Grid item xs>
                            <TextField
                              fullWidth
                              label='Option'
                              value={option}
                              onChange={event => {
                                setDataDesignForms(prevForms => {
                                  const newForms = [...prevForms];
                                  newForms[formIndex].options[optionIndex] = event.target.value;
                                  return newForms;
                                });
                              }}
                              required
                            />
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => handleRemoveOption(formIndex, optionIndex)}>
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button onClick={() => handleAddOption(formIndex)}>Add Option</Button>
                    </Grid>
                  )}
                  {form.type === 'dropdown' && (
                    <Grid item xs={12}>
                      {form.options.map((option, optionIndex) => (
                        <Grid container spacing={2} alignItems='center' key={optionIndex}>
                          <Grid item xs>
                            <TextField
                              fullWidth
                              label='Option'
                              value={option}
                              onChange={event => {
                                setDataDesignForms(prevForms => {
                                  const newForms = [...prevForms];
                                  newForms[formIndex].options[optionIndex] = event.target.value;
                                  return newForms;
                                });
                              }}
                              required
                            />
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => handleRemoveOption(formIndex, optionIndex)}>
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button onClick={() => handleAddOption(formIndex)}>Add Option</Button>
                    </Grid>
                  )}
                  {form.type === 'checkboxes' && (
                    <Grid item xs={12}>
                      {form.options.map((option, optionIndex) => (
                        <Grid container spacing={2} alignItems='center' key={optionIndex}>
                          <Grid item>
                            <Checkbox disabled />
                          </Grid>
                          <Grid item xs>
                            <TextField
                              fullWidth
                              label='Option'
                              value={option}
                              onChange={event => {
                                setDataDesignForms(prevForms => {
                                  const newForms = [...prevForms];
                                  newForms[formIndex].options[optionIndex] = event.target.value;
                                  return newForms;
                                });
                              }}
                              required
                            />
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => handleRemoveOption(formIndex, optionIndex)}>
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button onClick={() => handleAddOption(formIndex)}>Add Option</Button>
                    </Grid>
                  )}
                  {form.type === 'date' && (
                    <Grid item xs={12}>
                      <TextField fullWidth type='date' disabled />
                    </Grid>
                  )}
                  {form.type === 'time' && (
                    <Grid item xs={12}>
                      <TextField fullWidth type='time' disabled />
                    </Grid>
                  )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Button color='error' startIcon={<DeleteIcon />} onClick={() => handleRemoveForm(formIndex)}>
                    Remove
                  </Button>
                </Box>
              </AccordionContainer>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant='contained'
        color='primary'
        sx={{ marginTop: 2 }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddForm}>
        Add Form
      </Button>
    </Box>
  );
};

export default DatasetDesignTab;
