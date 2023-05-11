import React from 'react'
import Avatar from '@mui/material/Avatar';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  IconButton,
  Typography
} from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageIcon from '@mui/icons-material/Image';

import catJpeg from './images/cat.jpeg';

const PhotoCard = () => {
  return (
    <Card variant="outlined">
      <CardActionArea
        component="a"
        href="create"
        onClick={() => console.log('Opening post')}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ width: 24, height: 24 }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log("Clicked settings");
              }}
            >
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
          image={ catJpeg }
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <ImageIcon sx={{ pr: 1 }} />
            <Typography>
              328
            </Typography>
          </IconButton>
          <IconButton aria-label="share">
            <FavoriteIcon sx={{ pr: 1 }} />
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
  );
};

export { PhotoCard };
