import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Fade,
  Grid,
  Link,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '2px',
  p: 2
};

const LoginModal = () => {
  const { openLoginModal, setOpenLoginModal, setDisplayName, setUserId } = useContext(UserContext);
  const [responseError, setResponseError] = useState('');
  const [registering, setRegistering] = useState(false);

  const { control,
          getValues,
          handleSubmit,
          reset: clearForm
  } = useForm({ mode: 'onChange' });

  const closeModal = () => {
    clearForm();
    setOpenLoginModal(false);
    setResponseError('');
  }

  const handleFormSubmit = async (data) => {
    try {
      const path = registering ? '/account/new' : '/account/login';
      const res = await axios.post(path, data);
      const user = res.data;
      closeModal();
      setDisplayName(user.displayName);
      setUserId(user._id);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      if (typeof err.response.data === 'string') {
        setResponseError(err.response.data);
      } else if (err.response.data.errors !== null) {
        setResponseError(err.response.data.errors[0].msg);
      }
      console.error(err.response.data);
    }
  };

  return (
    <React.Fragment>
    <Modal 
      open={openLoginModal}
      onClose={() => {
        closeModal();
      }}
    >
      <Fade in={openLoginModal} onExited={clearForm}>
      <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack
          sx={style}
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4">Photo Wars</Typography>
          {
            registering && <Controller
              name="displayName"
              control={control}
              defaultValue=""
              rules={{
                required: 'Display name required',
                minLength: {
                  value: registering ? 3 : 0,
                  message: 'Must be at least 3 character long.'
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Display name"
                  variant="outlined"
                  {...field}
                />
              )}
            />
          }
          <Controller
            name="loginName"
            control={control}
            defaultValue=""
            rules={{
              required: 'Username required',
              minLength: {
                value: registering ? 6 : 0,
                message: 'Must be at least 6 characters long.'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label="Username"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="loginPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password required.',
              minLength: {
                value: registering ? 8 : 0,
                message: 'Must be at least 8 characters long'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                error={!!error}
                helperText={error ? error.message : null}
                label="Password"
                type="Password"
                variant="outlined"
                {...field}
              />
            )}
          />
          {
            registering && <Controller
              name="loginPasswordRepeat"
              control={control}
              defaultValue=""
              rules={{
                validate: {
                  passwordsMatch: value => value === getValues('loginPassword') || 'Passwords must match.'
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Repeat password"
                  type="password"
                  variant="outlined"
                  {...field}
                />
              )}
            />
          }
          { responseError !== '' && <Typography>{responseError}</Typography> }
          <Button type="submit" variant="outlined">
            { registering ? 'Register' : 'Login' }
          </Button>
          {
            registering ?
              <Typography>
                {"Already have an account? "}
                <Link
                  style={{ cursor: 'pointer'}}
                  onClick={() => {
                    setRegistering(false);
                    clearForm();
                  }}
                >
                  Login here.
                </Link>
              </Typography>
            :
              <Typography>
                {"Don't have an account? "}
                <Link
                  style={{ cursor: 'pointer'}}
                  onClick={() => {
                    setRegistering(true);
                    clearForm();
                  }}
                >
                  Register here.
                </Link>
              </Typography>
          }
        </Stack>
      </form>
      </Box>
      </Fade>
    </Modal>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Button
            onClick={() => {
              setOpenLoginModal(true);
              setRegistering(false);
            }}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setOpenLoginModal(true);
              setRegistering(true);
            }}
            variant="contained"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export { LoginModal };
