import React from 'react';
import { SideBar } from '../../components/sideBar/SideBar';
import { Outlet } from 'react-router-dom';
import {
  Grid,
  Stack
} from '@mui/material';
import { ProSidebarProvider } from 'react-pro-sidebar';

const Home = () => {

  return (
    <Stack direction="row">
      <ProSidebarProvider >
        <SideBar />
      </ProSidebarProvider>

      <Grid container spacing={7}>
        <Grid item xs={1} sm={2} md={2} lg={3} xl={4} />
        <Grid item xs={7} sm={6} md={7} lg={5} xl={4}>
          <Outlet />
        </Grid>
        <Grid item xs={1} sm={2} md={2} lg={4} xl={4} />
      </Grid>
    </Stack>
  );
};

export { Home };
