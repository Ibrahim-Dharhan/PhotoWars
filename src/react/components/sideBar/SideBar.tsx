import React, { useContext, useState } from 'react';
import axios from 'axios';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar
} from 'react-pro-sidebar';
import { LoginModal } from '../../components/loginModal/LoginModal';
import { UserContext } from '../../contexts/UserContext';

const SideBar = () => {
  const {
    displayName,
    setDisplayName,
    userId,
    setUserId
  } = useContext(UserContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const {
    broken,
  } = useProSidebar();

  const handleLogOut = async () => {
    const path = '/account/logout';
    try {
      const res = await axios.post(path);
      setDisplayName('');
      setUserId('');
      localStorage.removeItem('user');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Sidebar
      style={{
        ...!broken && {
          position: '-webkit-sticky',
          position: 'sticky',
          top: 0
        },
        height: '100vh'
      }}
      breakPoint="md"
    >
    <Menu>
      <MenuItem>
        <Typography variant="h5">Photo Wars</Typography>
      </MenuItem>
      <MenuItem icon={<ExploreOutlinedIcon />}>Explore</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />}>Open Competitions</MenuItem>
      <MenuItem icon={<EmojiEventsOutlinedIcon />}>Winners</MenuItem>
      <MenuItem icon={<NotificationsOutlinedIcon />}>Notifications</MenuItem>
      <MenuItem icon={<SearchOutlinedIcon />}>Search</MenuItem>
      <MenuItem icon={<AccountCircleOutlinedIcon />}>Profile</MenuItem>
      { userId === null ? <div /> : userId !== '' ?
          <React.Fragment>
          <MenuItem component="div" style={{ cursor: 'default'}}>
            <Button component={Link}
              to="/create"
              startIcon={<AddCircleOutlineIcon/>}
              variant="outlined"
            >
              Create Battle
            </Button>
          </MenuItem>
          <MenuItem component="div" style={{ cursor: 'default'}}>
            <Button onClick={handleLogOut} variant="outlined">
              Log Out
            </Button>
          </MenuItem>
          </React.Fragment>
        :
          <MenuItem>
            <Grid container wrap="nowrap" spacing={1}>
              <Grid item>
                <Button
                  onClick={() => setLoginOpen(true)}
                  variant="outlined"
                >Login</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Register</Button>
              </Grid>
            </Grid>
          </MenuItem>
      }
    </Menu>
    <LoginModal loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </Sidebar>
  );
}

export { SideBar };
