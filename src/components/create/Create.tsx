import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

const Create = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Title:', title);
    console.log('pic:', image);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function handleImageDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
  }

  return (
    <div>
      <Typography variant="h6">
        Create a war
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
        />

        <Box
          className="image-upload-box"
          onDrop={handleImageDrop}
          onDragOver={(event) => event.preventDefault()}
          sx={{ p: 2, border: '1px dashed grey' }}
        >

          <label htmlFor="image-upload">
            Drag and drop an image, or click to select a file:
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />

        </Box>

        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
          />
        </Button>
        <Button type="submit">
          Post
        </Button>
      </form>
    </div >
  );
};

export { Create };