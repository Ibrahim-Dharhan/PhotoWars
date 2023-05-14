import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './create.css';
import axios from "axios";
import { Controller, useForm } from 'react-hook-form';

const Create = () => {
  const [image, setImage] = useState(null);
  const { control,
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const handleFormSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("file", image);
    try {
      const res = await axios.post('/battle/new', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <Typography variant="h6">
        Create a war
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              {...field}
            />
          )}
        />
              {image ? (
                <img src={URL.createObjectURL(image)} className="image-preview" />
              ) : (
                <Box
                  onDragOver={(event) => event.preventDefault()}
                  sx={{ p: 2, border: "1px dashed grey" }}
                >
                  <label htmlFor="image-upload">Drag and drop an image, or</label>

                  <Button variant="outlined" component="label">
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
                </Box>
              )}
        <Button
          variant="contained"
          type="submit"
        >
          Post
        </Button>
      </form>
    </div >
  );
};

export { Create };
