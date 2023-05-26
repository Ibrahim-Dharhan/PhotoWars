import React, { useContext } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UserContext } from '../../contexts/UserContext';
import { LoginModal } from '../loginModal/LoginModal';
import { Link, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const {
    displayName,
    setDisplayName,
    userId,
    setUserId
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    const path = '/account/logout';
    try {
      await axios.post(path);
      setDisplayName('');
      setUserId('');
      localStorage.removeItem('user');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "grey", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Typography>PhotoWars</Typography>
          <Box>
            {userId === null ? <div /> : userId !== '' ?
              <React.Fragment>
                  <Button
                    component={Link}
                    startIcon={<AddCircleOutlineIcon />}
                    to="/create"
                    variant="contained"
                  >
                    Create War
                  </Button>
                  <Button variant="contained" onClick={handleLogOut}>
                    Log Out
                  </Button>
              </React.Fragment>
              :
              <LoginModal />
            }
          </Box>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export { TopBar };
