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
  Typography
} from '@mui/material';
import {
  MenuItem
} from 'react-pro-sidebar';
import PropTypes from 'prop-types';
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  TextFieldElement,
  useForm
} from 'react-hook-form-mui';
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
  const [formType, setFormType] = useState(false);

  const formContext = useForm();
  const { handleSubmit, reset: clearForm } = formContext;

  const handleFormSubmit = async (data) => {
    try {
      const path = formType ? '/account/new' : '/account/login';
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
    <MenuItem>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Button
            onClick={() => {
              setOpen(true);
              setFormType(false);
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
              setFormType(true);
            }}
            variant="outlined"
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </MenuItem>
    <Modal 
      open={open}
      onClose={() => {
        setOpen(false)
        setResCode(200);
      }}
    >
      <Fade in={open} onExited={clearForm}>
      <Box>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(handleFormSubmit)}
      >
        <Stack
          sx={style}
          direction="column"
          alignItems="center"
          wrap="nowrap"
          spacing={2}
        >
          <Typography variant="h4">Photo Wars</Typography>
          {
            formType && <TextFieldElement
              name={'displayName'}
              label={'Display Name'}
              variant={'outlined'}
              required
            />
          }
          <TextFieldElement
            name={'loginName'}
            label={'Username'}
            variant={'outlined'}
            required
          />
          <PasswordElement
            name={'loginPassword'}
            label={'Password'}
            variant={'outlined'}
            required
          />
          {
            formType && <PasswordRepeatElement
              passwordFieldName={'loginPassword'}
              name={'loginPasswordRepeat'}
              label={'Repeat Password'}
              variant={'outlined'}
              required
            />
          }
          { resCode === 401 && <Typography>Invalid credentials.</Typography> }
          { resCode === 409 && <Typography>User already exists.</Typography> }
          <Button type="submit" variant="outlined">
            { formType ? 'Register' : 'Login' }
          </Button>
          {
            formType ?
              <Typography>
                {"Already have an account? "}
                <Link
                  style={{ cursor: 'pointer'}}
                  onClick={() => {
                    setFormType(false);
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
                    setFormType(true);
                    clearForm();
                  }}
                >
                  Register here.
                </Link>
              </Typography>
          }
        </Stack>
      </FormContainer>
      </Box>
      </Fade>
    </Modal>
    </React.Fragment>
  );
}

export { LoginModal };
