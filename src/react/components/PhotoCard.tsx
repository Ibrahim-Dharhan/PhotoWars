import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

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
