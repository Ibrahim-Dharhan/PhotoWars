import React, { useContext, useEffect, useState } from 'react';
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
import {
  MenuItem
} from 'react-pro-sidebar';
import PropTypes from 'prop-types';
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
  const { setDisplayName, setUserId } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [resCode, setResCode] = useState(200);
  // false for login form, true for register form
  const [registering, setRegistering] = useState(false);

  const { control,
          getValues,
          handleSubmit,
          reset: clearForm
  } = useForm({ mode: 'onChange' });

  const handleFormSubmit = async (data) => {
    try {
      console.log(data);
      const path = registering ? '/account/new' : '/account/login';
      const res = await axios.post(path, data);
      const user = res.data;
      clearForm();
      setOpen(false);
      setResCode(res.status);
      setDisplayName(user.displayName);
      setUserId(user._id);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      if (err.response.status === 401) {
        setResCode(err.response.status);
      } else if (err.response.status === 409) {
        setResCode(err.response.status)
      } else {
        console.error(err.response.data);
      }
    }
  };

  return (
    <React.Fragment>
    <Modal 
      open={open}
      onClose={() => {
        setOpen(false)
        setResCode(200);
      }}
    >
      <Fade in={open} onExited={clearForm}>
      <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack
          sx={style}
          direction="column"
          alignItems="center"
          wrap="nowrap"
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
                  value: registering ? 1 : 0,
                  message: 'Must be at least 1 character long.'
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
          { resCode === 401 && <Typography>Invalid credentials.</Typography> }
          { resCode === 409 && <Typography>User with username or display name already exists.</Typography> }
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
    <MenuItem>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Button
            onClick={() => {
              setOpen(true);
              setRegistering(false);
            }}
            variant="outlined"
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setOpen(true);
              setRegistering(true);
            }}
            variant="outlined"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </MenuItem>
    </React.Fragment>
  );
}

export { LoginModal };
