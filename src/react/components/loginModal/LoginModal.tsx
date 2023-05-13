import React from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  Link,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Form } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
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
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = event.target.form.username.value;
    const password = event.target.form.password.value;
    try {
      const res = await axios.post('/account/login', {
        loginName: username,
        loginPassword: password
      });
      console.log(res);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Modal 
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
    >
      <Fade in={loginOpen}>
        <Box sx={style}>
          <Form method="post" action="/account/login">
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
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={handleLogin}
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
          </Form>
        </Box>
      </Fade>
    </Modal>
  );
}

export { LoginModal };
