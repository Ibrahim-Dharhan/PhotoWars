import React from 'react';
import { SideBar } from '../../components/sideBar/SideBar';
import { TopBar } from '../../components/topBar/TopBar';
import { Outlet } from 'react-router-dom';
import { Grid, Stack, Toolbar } from '@mui/material';

const Home = () => {
  return (
  <React.Fragment>
    <TopBar />
    <Toolbar />
    <Stack direction='row'>
      <SideBar />
      
      <Grid container spacing={1} sx={{ pt:2 }}>
        <Grid item sm={1} lg={2} /> 
        <Grid item sm={10} lg={8}> 
          <Outlet />
        </Grid>
        <Grid item sm={1} lg={2} />
      </Grid>
    </Stack>
  </React.Fragment>
  );
};

export { Home };
