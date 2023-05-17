import React, { useState } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const Submit = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset: clearForm,
    resetField
  } = useForm();

  const submitForm = async (data) => {
    const path = `/battle/${id}/submit`;
    const form = new FormData();
    form.append('caption', data.caption);
    form.append('file', image);
    const res = await axios.post(path, form);
    console.log(res.data);
    clearForm();
    navigate('..');
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function handleClearImage() {
    setImage(null);
    resetField('file');
  }

  function handleImageDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
  }

  return (
    <React.Fragment>
      <Typography variant="h6">
        Enter a submission
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
      <Stack spacing={1}>
        <Controller
          name="caption"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              error={!!error}
              helperText={error ? error.message : null}
              label="Title"
              variant="outlined"
              {...field}
            />
          )}
        />

        {image ?
           <React.Fragment>
           <Box
             component="img"
             src={URL.createObjectURL(image)}
             sx={{
               border: "1px solid grey",
               width: '100%'
             }}
           />
           <Box display="flex" justifyContent="flex-end">
             <Button
               onClick={handleClearImage}
               sx={{width: '10px'}}
               variant="outlined"
             >
               Clear
             </Button>
           </Box>
           </React.Fragment>
         :
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
               sx={{ p: 2, border: '1px dashed grey' }}
               {...field}
             >
               <label>
                 {'Drag and drop an image, or '}
               </label>
               <Button
                 variant="outlined"
                 component="label"
               >
                 Upload File
                 <input
                   type="file"
                   hidden
                   accept="image/*"
                   onChange={handleImageChange}
                 />
               </Button>
             </Box>
             <FormHelperText error={!!error}>
               {error ? error.message : ''}
             </FormHelperText>
             </React.Fragment>
             )}
           />
        }
        <Button
          variant="contained"
          type="submit"
        >
          Post
        </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
};

export { Submit };
