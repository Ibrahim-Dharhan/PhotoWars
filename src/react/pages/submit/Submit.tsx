import React, { useState } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

interface BVSubmissionState {
  numBVSubmissions: number,
  setNumBVSubmissions: React.Dispatch<React.SetStateAction<number>>
}

const Submit = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const {numBVSubmissions, setNumBVSubmissions} = useOutletContext() as BVSubmissionState;

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
    setNumBVSubmissions(numBVSubmissions + 1);
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
      <Box sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit(submitForm)}>
      <Stack spacing={2}>
      <Typography variant="h6">
        Enter a submission
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
              inputProps = {{ maxLength: 60 }}
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
               sx={{ width: '10px' }}
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
               sx={{ border: '1px dashed grey' }}
               {...field}
             >
               <Stack
              sx={{ height: "200px" }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <label>
                 {'Drag and drop an image, or '}
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
        }
        <Button
          variant="contained"
          type="submit"
        >
          Post
        </Button>
        </Stack>
      </form>
      </Box>
    </React.Fragment>
  );
};

export { Submit };
