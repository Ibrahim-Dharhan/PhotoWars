import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { PhotoCard } from './PhotoCard';

const HelloWorld = () => {
  return (
    <Grid container spacing={7}>
      <Grid item xs={4}>
        Sidebar
      </Grid>
      <Grid item xs={4}>
        <PhotoCard />
      </Grid>
      <Grid item xs={4}>
        Side column
      </Grid>
    </Grid>
  );
};

export { HelloWorld };
