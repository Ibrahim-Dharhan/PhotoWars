import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { updateDeadline } from './timerLogic';
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
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageIcon from '@mui/icons-material/Image';
import { pink } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import './battleCard.css';

const BattleCard = ({
  battleId
}) => {
  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [filename, setFilename] = useState('');
  const [voted, setVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('--:--:--');
  const _battle = useRef(null);
  const _deadline = useRef(null);
  const _timerEvent = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    updateDeadline(_deadline.current, _timerEvent, setTimeRemaining);
  }, []);

  useEffect(() => {
    let shouldUpdate = true;
    const setBattleInformation = async() => {
      const path = `/battle/${battleId}`;
      const res = await axios.get(path);
      const battle = res.data;

      if (shouldUpdate) {
        setCaption(battle.caption);
        setDisplayName(battle.author.displayName);
        setFilename(battle.filename);
        _battle.current = battle;
        _deadline.current = new Date(battle.deadline);
      }
    };
    try {
      setBattleInformation();
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, [battleId]);

  const vote = async () => {
    // const path = `/battle/${battleId}/${voted ? 'unvote' : 'vote'}`;
    // const res = await axios.put(path);
    setVoted(!voted);
  };

  return (
    <Card variant="outlined">
      <CardActionArea
        component="div"
        onClick={() => {
          console.log("Open post");
          navigate(`/battles/${battleId}`);
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(`Go to profile page at /user/${_battle.current._id}`);
              }}
              underline="hover"
              sx={{ width: 24, height: 24 }}
            >
              {displayName[0]}
            </Avatar>
          }
          title={
            <Link
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(`Go to profile page at /user/${_battle.current._id}`);
                // navigate(`/user/${_battle.curent._id}`);
              }}
              style={{ color: 'black' }}
            >
              {displayName}
            </Link>
          }
          action={
            <IconButton
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log('Clicked download');
              }}
            >
              <DownloadIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ mt: -3 }}>
          <Typography variant="h6">
            {caption}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={`/image/${filename}`}
          loading="lazy"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <ImageIcon sx={{ pr: 1 }} />
            <Typography>
              328
            </Typography>
          </IconButton>
          <IconButton
            onMouseDown={ (event) => event.stopPropagation()}
            onClick={ (event) => {
              event.stopPropagation();
              event.preventDefault();
              console.log('Voting on post');
              vote();
            }}
            aria-label="vote"
          >
            <FavoriteIcon
              sx={{ pr: 1, color: (voted ? pink[500]: undefined) }}
            />
            <Typography>
              {voted ? 1 : 0}
            </Typography>
          </IconButton>
          <Box display="flex" marginLeft="auto" alignItems="center">
            <Typography sx={{ pr: 2 }}>
              {timeRemaining}
            </Typography>
            <Button
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log('Open submit page');
              }}
              variant="outlined"
              size="small"
              color="primary"
            >
              Enter
            </Button>
          </Box>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export { BattleCard };
