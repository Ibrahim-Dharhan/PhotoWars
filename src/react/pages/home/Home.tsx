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
      
      <Grid container spacing={1} sx={{ pt:2 }}>
        <Grid item xl={2} /> 
        <Grid item xl={8}> 
          <Outlet />
        </Grid>
        <Grid item xl={2} />
      </Grid>
    </Stack>
  );
};

export { Home };
