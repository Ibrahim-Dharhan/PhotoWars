import React from 'react';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
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
        </List>
      </Box>
    </Drawer>
  );
}

export { SideBar };
