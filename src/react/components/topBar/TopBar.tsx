import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Box,
  Button,
  Icon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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
  const [anchorElement, setAnchorElement] = useState(null);

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
    <AppBar
      elevation={0}
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Typography
            onClick={() => navigate('/')}
            sx={{
              '&:hover': {
                cursor: 'pointer'
              },
              fontWeight: 800
            }}
            variant="h5"
          >
            <Icon>
  <img src="../../assets/swords-icon.svg"/>
</Icon>
            PHOTOWARS
          </Typography>
          <Box>
            {userId === null ? <div /> : userId !== '' ?
              <Stack direction="row" spacing={2}>
                  <Button
                    component={Link}
                    to="/create"
                    variant="contained"
                  >
                    Create War
                  </Button>
                  <Button
                    onClick={(event) => setAnchorElement(event.target)}
                    startIcon={<AccountCircleOutlinedIcon />}
                    variant="secondary"
                  >
                    {displayName}
                  </Button>
                  <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElement}
                    anchorOrigin={{
                      horizontal: 'right',
                      vertical: 'top'
                    }}
                    keepMounted
                    transformOrigin={{
                      horizontal: 'right',
                      vertical: 'top'
                    }}
                    open={Boolean(anchorElement)}
                    onClose={() => setAnchorElement(null)}
                  >
                    <MenuItem
                      key={'profile'} 
                      onClick={() => {
                        navigate(`/users/${userId}`)
                        setAnchorElement(null);
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      key={'logout'} 
                      onClick={() => {
                        handleLogOut();
                        setAnchorElement(null);
                      }}
                    >
                      Log Out
                    </MenuItem>
                  </Menu>
              </Stack>
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
