import * as React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Typography } from '@mui/material';
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
        <MenuItem
          icon={<AddCircleOutlineIcon/>}
          onClick={createBattleClick}
        >
          Create Battle
        </MenuItem>
        <MenuItem>
          
        </MenuItem>
      </Menu>
      </Sidebar>
  );
}

export { SideBar };
