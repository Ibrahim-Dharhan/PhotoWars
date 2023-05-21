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

      <Grid container spacing={7} sx={{ pt:2 }}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Outlet />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
      </Grid>
    </Stack>
  );
};

export { Home };
