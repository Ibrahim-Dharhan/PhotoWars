import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PropTypes from 'prop-types';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { getImage } from '../../../definitions/getImage';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { IUserFrontend } from '../../../definitions/schemas/mongoose/user';
import { UserContext } from '../../contexts/UserContext';

interface UVUserHeaderEditState {
  user: IUserFrontend
}

const UserHeaderEdit = () => {
  const { setDisplayName } = useContext(UserContext);
  const { user } = useOutletContext() as UVUserHeaderEditState;
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset: clearForm,
    resetField
  } = useForm({ mode: 'onChange' });

  const handleSave = async (data) => {
    const path = '/user';
    const form = new FormData();
    form.append('file', image);
    form.append('firstName', data.firstName);
    form.append('lastName', data.lastName);
    form.append('displayName', data.displayName);
    form.append('description', data.description);
    try {
      const res = await axios.put(path, form);
      console.log(res.data);
      setDisplayName(data.displayName);
      clearForm();
      navigate('..');
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetImage = () => {
    setImage(null);
    resetField('file');
  }

  useEffect(() => {
    getImage(user.filename, setImageUrl);
  }, [user.filename]);

  return (
    <form onSubmit={handleSubmit(handleSave)}>
    <Box display='flex' sx={{ border: '1px dashed grey', padding: '1em' }}>
      <Controller
        name="file"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <Grid
            sx={{
              minWidth: '15%',
              minHeight: '15%',
              position: 'relative',
            }}
            {...field}
          >
            <Avatar
              src={image ? URL.createObjectURL(image) : imageUrl}
              // src={'/image/skullCatSubmission3.jpeg'}
              sx={{
                position: 'absolute',
                minWidth: '100%',
                height: 'auto',
                aspectRatio: '1',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />

            <input
              type="file"
              hidden
              id="image-upload"
              onChange={(event) => setImage(event.target.files[0])}
            />
            <label htmlFor="image-upload">
              <IconButton
                size="large"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                component="span"
              >
                <PhotoCamera fontSize="inherit" />
              </IconButton>
            </label>
          </Grid>
        )}
      />
      <Stack paddingLeft={2} spacing={1}>
        <Stack direction="row" spacing={2}>
        <Controller
          name="firstName"
          control={control}
          defaultValue={user.firstName}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="First Name"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue={user.lastName}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Last Name"
              variant="outlined"
              {...field}
            />
          )}
        />
        </Stack>
        <Controller
          name="displayName"
          control={control}
          defaultValue={user.displayName}
          render={({ field, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={user.description}
          render={({ field, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Fun Fact: </InputAdornment>
                )
              }}
              {...field}
            />
          )}
        />
      </Stack>
      <Button
        type="submit"
        sx={{
          marginBottom: 'auto',
          marginLeft: 'auto',
        }}
      >
        Save
      </Button>
    </Box>
    </form>
  );
};

UserHeaderEdit.propTypes = {
  user: PropTypes.object,
};

export { UserHeaderEdit };
