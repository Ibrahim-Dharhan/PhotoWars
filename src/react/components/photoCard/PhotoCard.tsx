import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
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

import catJpeg from '../../../public/images/cat.jpeg';

const PhotoCard = ({
  battleId
}) => {
  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [filename, setFilename] = useState('');

  const getImageUrl = (filename) => {
    const imageEndpoint = `/image/${filename}`;
    return imageEndpoint;
  };

  useEffect(() => {
    let shouldUpdate = true;
    const setBattleInformation = async() => {
      const path = `/battle/${battleId}`;
      const res = await axios.get(path);
      console.log(res.data);
      const battle = res.data;

      if (shouldUpdate) {
        setCaption(battle.caption);
        setDisplayName(battle.author.displayName);
        setDeadline(battle.deadline);
        setFilename(battle.filename);
      }
    };
    setBattleInformation();
    return () => { shouldUpdate = false };
  }, [battleId]);

  return (
    <Card variant="outlined">
      <CardActionArea
        component="a"
        onClick={() => console.log('Opening post')}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ width: 24, height: 24 }} aria-label="recipe">
              { displayName[0] }
            </Avatar>
          }
          action={
            <IconButton
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log('Clicked settings');
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={displayName}
        />
        <CardContent sx={{ mt: -3 }}>
          <Typography variant="h6">
            {caption}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={ getImageUrl(filename) }
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
