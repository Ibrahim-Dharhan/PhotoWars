import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
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
  const { control,
    handleSubmit,
    resetField,
  } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();
  const handleFormSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("file", image);
    formData.append("deadline", length.toISOString());
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

  function handleClearImage() {
    setImage(null);
    resetField('file');
  }

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Create a war
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          <Box
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setImage(event.dataTransfer.files[0]);
            }}
            sx={{ p: 2, border: "1px dashed grey", my: 2 }}
          >
            <Stack
              sx={{ height: "200px" }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >

              <label htmlFor="image-upload">Drag and drop an image, or</label>
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
        <br />
        <Button

          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </form>
    </React.Fragment>
  );
};

export { Create };
