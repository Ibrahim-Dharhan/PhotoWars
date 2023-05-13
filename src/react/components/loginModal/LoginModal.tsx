import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Fade,
  Grid,
  Link,
  Modal,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useForm, FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { UserContext } from '../../contexts/UserContext';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '2px',
  p: 2,
  flexGrow: 1
};

const LoginModal = ({
  loginOpen,
  setLoginOpen
}) => {
  const { setDisplayName, setUserId } = useContext(UserContext);
  const [failedLogin, setFailedLogin] = useState(false);

  const formContext = useForm();
  const { handleSubmit, reset: clearLoginForm } = formContext;

  const handleLogin = async (data) => {
    try {
      const res = await axios.post('/account/login', data);
      const user = res.data;
      clearLoginForm();
      setLoginOpen(false);
      setFailedLogin(false);
      setDisplayName(user.displayName);
      setUserId(user._id);
    } catch (err) {
      if (err.response.status === 401) {
        setFailedLogin(true);
      } else {
        console.error(err.response.data);
      }
    }
  };

  return (
    <Modal 
      open={loginOpen}
      onClose={() => {
        setLoginOpen(false)
        setFailedLogin(false);
      }}
    >
      <Fade in={loginOpen} onExited={clearLoginForm}>
      <Box sx={style}>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(handleLogin)}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item>
            <Typography variant="h4">Photo Wars</Typography>
          </Grid>
          <Grid item>
            <TextFieldElement
              name={'loginName'}
              label={'Username'}
              variant={'outlined'}
              required
            />
          </Grid>
          <Grid item>
            <TextFieldElement
              name={'loginPassword'}
              label={'Password'}
              type={'password'}
              variant={'outlined'}
              required
            />
          </Grid>
          { failedLogin && <Typography>Invalid credentials.</Typography> }
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography>
              {"Don't have an account? "}
              <Link
                style={{ cursor: 'pointer'}}
                onClick={() => console.log("Open registerModal")}
              >
                Register here.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </FormContainer>
      </Box>
      </Fade>
    </Modal>
  );
}

LoginModal.propTypes = {
  loginOpen: PropTypes.bool,
  setLoginOpen: PropTypes.func
};

export { LoginModal };
