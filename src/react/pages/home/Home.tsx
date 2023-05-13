import React, { useState } from 'react';
import { Feed } from '../../components/feed/Feed';
import { RightBar } from '../../components/rightBar/RightBar';
import { SideBar } from '../../components/sideBar/SideBar';
import { TopBar } from '../../components/topBar/TopBar';
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
        <Grid item xs={1} s={2} md={2} lg={3} xl={4} />
        <Grid item xs={7} s={6} md={7} lg={5} xl={4}>
          <Outlet />
        </Grid>
        <Grid item xs={1} s={2} md={2} lg={4} xl={4} />
      </Grid>
    </Stack>
  );
};

export { Home };
