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
import Box from '@mui/material/Box';

const HelloWorld = () => {
  return (
    <Grid container spacing={7}>
      <Grid item xs={4}>
        Sidebar
      </Grid>
      <Grid item xs={4}>
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
            <CardContent sx={{ mt: -3 }}>
              <Typography variant="h6">
                Incredibly Fast Cat
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="components/images/cat.jpeg"
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <ImageIcon sx={{ pr: 1 }}/>
                <Typography>
                328
                </Typography>
              </IconButton>
              <IconButton aria-label="share">
                <FavoriteIcon sx={{ pr: 1 }}/>
                <Typography>
                73
                </Typography>
              </IconButton>
              <Box display="flex" marginLeft="auto" alignItems="center">
                <Typography sx={{ pr: 2 }}>
                  2 hours left
                </Typography>
                <Button variant="outlined" size="small" color="primary">
                  Enter
                </Button>
              </Box>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={4}>
        Side column
      </Grid>
    </Grid>
  );
};

export { HelloWorld };
