import React, { useContext } from 'react';
import axios from 'axios';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoginModal } from '../../components/loginModal/LoginModal';
import { UserContext } from '../../contexts/UserContext';

const SideBar = () => {
  const {
    displayName,
    setDisplayName,
    userId,
    setUserId
  } = useContext(UserContext);

  const navigate = useNavigate();
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem key={'explore'} disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <ExploreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Explore'} />
            </ListItemButton>
          </ListItem>
          { userId &&
            <ListItem key={'profile'} disablePadding>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={displayName} />
              </ListItemButton>
            </ListItem>
          }
        </List>
      </Box>
    </Drawer>
  );
}

export { SideBar };
