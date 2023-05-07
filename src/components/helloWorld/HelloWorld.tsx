import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const HelloWorld = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        Sidebar
      </Grid>
      <Grid item xs={6}>
        Feed
      </Grid>
      <Grid item xs={3}>
        Side column
      </Grid>
    </Grid>
  );
};

export { HelloWorld };
