import React from 'react';
import { Feed } from '../../components/feed/Feed';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { RightBar } from '../../components/rightBar/RightBar';
import { SideBar } from '../../components/sideBar/SideBar';
import { TopBar } from '../../components/topBar/TopBar';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <ProSidebarProvider>
      <div style={({ height: "100vh", display: "flex" })}>
        <SideBar />
        <Grid container spacing={7}>
          <Grid item xs={2} s={4} md={3} lg={3} xl={3}/>
          <Grid item xs={7} s={6} md={6} lg={4} xl={5}>
            <Feed />
          </Grid>
          <Grid item xs={3} s={2} md={3} lg={4} xl={3}>
            <RightBar />
          </Grid>
        </Grid>
      </div>
    </ProSidebarProvider>
  );
};

export { Home };
