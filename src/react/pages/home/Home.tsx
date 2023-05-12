import React, { useState } from 'react';
import { Feed } from '../../components/feed/Feed';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { RightBar } from '../../components/rightBar/RightBar';
import { SideBar } from '../../components/sideBar/SideBar';
import { TopBar } from '../../components/topBar/TopBar';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <ProSidebarProvider>
      <div style={({ height: "100vh", display: "flex" })}>
        <Grid container wrap="nowrap" spacing={7}>
          <Grid item xs={1} />
          <Grid item>
            <SideBar breakpoint="sm" />
          </Grid>
          <Grid item xs={1} md={2} />
          <Grid item xs={7} s={6} md={6} lg={4} xl={5}>
            <Outlet />
          </Grid>
          <Grid item xs={1} md={2} xl={4} />
        </Grid>
      </div>
    </ProSidebarProvider>
  );
};

export { Home };
