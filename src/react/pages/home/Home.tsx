import React from 'react';
import { RightBar } from '../../components/rightBar/RightBar';
import { SideBar } from '../../components/sideBar/SideBar';
import { TopBar } from '../../components/topBar/TopBar';
import { Outlet } from 'react-router-dom';
import { Grid, Stack, Toolbar } from '@mui/material';

const Home = () => {
  return (
  <Stack spacing={2}>
    <TopBar />
    <Stack direction='row' spacing={4}>
      <SideBar />
      <Stack>
        <Toolbar />
        <Outlet />
      </Stack>
    </Stack>
  </Stack>
  );
};

export { Home };
