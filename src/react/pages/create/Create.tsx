import React, { useState } from 'react';
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import './create.css';
import axios from "axios";
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [image, setImage] = useState(null);
  const [length, setLength] = useState(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset: clearForm,
    resetField,
  } = useForm({ mode: 'onChange' });

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("file", image);
    formData.append("deadline", length.toISOString());
    clearForm();
    try {
      await axios.post('/battle/new', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    resetField('file');
  }

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h6" >
            Create a war
          </Typography>

          <Controller
            name="caption"
            control={control}
            defaultValue=""
            rules={{
              required: 'Caption required'
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                id="outlined-basic"
                label="Photo caption"
                variant="outlined"
                {...field}
              />
            )}
          />

          {image ? (
            <React.Fragment>
              <Box sx={{ my: 2 }}>
                <img src={URL.createObjectURL(image)} className="image-preview" />
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={handleClearImage}
                  sx={{ width: '10px' }}
                  variant="outlined"
                >
                  Clear
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <Controller
              name="file"
              control={control}
              defaultValue=""
              rules={{
                validate: {
                  imageExists: value => !!value || 'Please upload an image.'
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <React.Fragment>
                  <Box
                    onDrop={handleImageDrop}
                    onDragOver={(event) => event.preventDefault()}
                    sx={{ border: '1px dashed grey' }}
                    {...field}
                  >
                    <Stack
                      sx={{ height: "200px" }}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >                
                      <label htmlFor="image-upload">
                        Drag and drop an image, or
                      </label>            
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{ ml: 1 }}>
                        Upload File
                        <input
                          type="file"
                          hidden
                          id="image-upload"
                          accept="image/*"
                          name="image"
                          onChange={(event) => setImage(event.target.files[0])}
                        />
                      </Button>
                    </Stack>
                  </Box>
                  <FormHelperText error={!!error}>
                    {error ? error.message : ''}
                  </FormHelperText>
                </React.Fragment>
              )}
            />
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Deadline"
              value={length}
              onChange={(value) => {
                setLength(value);
              }}
            />
          </LocalizationProvider>
          {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={length}
          label="Length"
          onChange={(event) => setLength(event.target.value as string)}
        >
          <MenuItem value={12}>12 hours</MenuItem>
          <MenuItem value={24}>24 hours</MenuItem>
          <MenuItem value={48}>48 hours</MenuItem>
        </Select> */}
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
};

export { Create };
