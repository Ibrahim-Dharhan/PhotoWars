import React from 'react';
import { SideBar } from '../../components/sideBar/SideBar';
import { Outlet } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { ProSidebarProvider } from 'react-pro-sidebar';

const Home = () => {
  return (
    <Stack direction='row'>
      <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>

      <Grid container spacing={7} sx={{ pt: 2 }}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Outlet />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
      </Grid>
    </Stack>
  );
};

export { Home };
