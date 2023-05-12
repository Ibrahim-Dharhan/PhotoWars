import * as React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar
} from "react-pro-sidebar";

const SideBar = () => {
  const navigate = useNavigate();
  const createBattleClick = () => {
    navigate('/create');
  };

  const { collapseSidebar } = useProSidebar();

  return (
      <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{textAlign: "center" }}
        >
          <Typography variant="h5">PhotoWars</Typography>
        </MenuItem>
        <MenuItem icon={<ExploreOutlinedIcon />}>Explore</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />}>Open Competitions</MenuItem>
        <MenuItem icon={<EmojiEventsOutlinedIcon />}>Winners</MenuItem>
        <MenuItem icon={<NotificationsOutlinedIcon />}>Notifications</MenuItem>
        <MenuItem icon={<SearchOutlinedIcon />}>Search</MenuItem>
        <MenuItem icon={<AccountCircleOutlinedIcon />}>Profile</MenuItem>
        <MenuItem>
          <Button
            onClick={createBattleClick}
            startIcon={<AddCircleOutlineIcon/>}
            variant="outlined"
          >
            Create Battle
          </Button>
        </MenuItem>
        <MenuItem>
          <Grid container wrap="nowrap" spacing={1}>
            <Grid item>
              <Button variant="outlined">Login</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Register</Button>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
      </Sidebar>
  );
}

export { SideBar };
