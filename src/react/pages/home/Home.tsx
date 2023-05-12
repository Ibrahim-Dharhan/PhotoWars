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
          <Grid item xs={2}/>
          <Grid item xs={7}>
            <Feed />
          </Grid>
          <Grid item xs={3}>
            <RightBar />
          </Grid>
        </Grid>
      </div>
    </ProSidebarProvider>
  );
};

export { Home };
