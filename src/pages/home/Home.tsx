import React from 'react';
import { Feed } from '../../components/feed/Feed';
import { Rightbar } from '../../components/rightbar/Rightbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <Grid container spacing={7}>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item xs={4}>
        <Feed />
      </Grid>
      <Grid item xs={4}>
        <Rightbar />
      </Grid>
    </Grid>
  );
};

export { Home };