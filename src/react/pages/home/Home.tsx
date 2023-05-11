import React from 'react';
import { Feed } from '../../components/feed/Feed';
import { RightBar } from '../../components/rightBar/RightBar';
import { SideBar } from '../../components/sideBar/SideBar';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <Grid container spacing={7}>
      <Grid item xs={4}>
        <SideBar />
      </Grid>
      <Grid item xs={4}>
        <Feed />
      </Grid>
      <Grid item xs={4}>
        <RightBar />
      </Grid>
    </Grid>
  );
};

export { Home };
