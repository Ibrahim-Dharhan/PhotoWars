import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const HelloWorld = () => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={3}>
        Sidebar
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined">
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar sx={{ width: 24, height: 24 }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="user_name"
            />
            <CardContent>
              <Typography variant="h6">
                Incredibly Fast Cat
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="components/images/cat.jpeg"
              alt="Paella dish"
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <ImageIcon />
                328
              </IconButton>
              <IconButton aria-label="share">
                <FavoriteIcon />
                87
              </IconButton>
              <Button variant="outlined" size="small" color="primary">
                Enter
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        Side column
      </Grid>
    </Grid>
  );
};

export { HelloWorld };
