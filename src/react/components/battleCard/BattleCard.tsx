import React, { useContext, useEffect, useRef, useState } from 'react';
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
  Tooltip,
  Typography
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageIcon from '@mui/icons-material/Image';
import { blue, grey, pink } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import './battleCard.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';

const BattleCard = ({
  battleId
}) => {
  const { userId, setOpen } = useContext(UserContext);

  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [filename, setFilename] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [numVotes, setNumVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('--:--:--');

  const _battle = useRef(null);
  const _deadline = useRef(null);
  const _submitted = useRef(false);
  const _timerEvent = useRef(null);

  const navigate = useNavigate();

  const handleDownload = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const url = `/image/${filename}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  /* useEffect for updating caption, display name, and image.  */
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
      updateDeadline(_deadline.current, _timerEvent, setTimeRemaining);
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, []);

  /* useEffect for updating vote and submission count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getSubmissionsAndVotes = async() => {
      const votesPath = `/vote/${battleId}`;
      const votesRes = await axios.get(votesPath);
      const { numVotes, votedOn } = votesRes.data;

      const submissionsPath = `/battle/${battleId}/submissions`;
      const submissionsRes = await axios.get(submissionsPath);
                color: (submissions
                        .map(submission => submission.author)
                        .includes(userId)
                        ? blue[500] : undefined)

      if (shouldUpdate) {
        setVoted(votedOn);
        setNumVotes(numVotes);

        setSubmissions(submissionsRes.data);
        _submitted.current = submissions
                             .map(submission => submission.author)
                             .includes(userId);
      }
    };
    try {
      getSubmissionsAndVotes();
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, [userId]);

  const vote = async () => {
    const path = `/battle/${battleId}/${voted ? 'unvote' : 'vote'}`;
    try {
      const res = await axios.put(path);
      setVoted(!voted);
      setNumVotes(numVotes + (voted ? -1 : 1));
    } catch (err) {
      console.error(err.response.data);
    }
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
            <Avatar sx={{ width: 24, height: 24 }}>
              {displayName[0]}
            </Avatar>
          }
          title={
            <Link
              to=""
              // to=`/user/${_battle.current.author._id}`
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={ (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(`Go to profile page at /user/${_battle.current._id}`);
              }}
            >
              {displayName}
            </Link>
          }
          action={
            <IconButton
              onMouseDown={ (event) => event.stopPropagation()}
              onClick={handleDownload}
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
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
          >
            <ImageIcon
              sx={{
                pr: 1,
                color: (_submitted.current && blue[500])
              }}
            />
            <Typography>
              {submissions.length}
            </Typography>
          </IconButton>
          <IconButton
            onMouseDown={ (event) => event.stopPropagation()}
            onClick={ (event) => {
              event.stopPropagation();
              event.preventDefault();
              if (userId !== '') {
                vote();
              } else {
                setOpen(true);
              }
            }}
          >
            <FavoriteIcon
              sx={{ pr: 1, color: (voted && pink[500]) }}
            />
            <Typography>
              {numVotes}
            </Typography>
          </IconButton>
          <Box display="flex" marginLeft="auto" alignItems="center">
            <Typography sx={{ pr: 2 }}>
              {timeRemaining}
            </Typography>
            <Tooltip
              title={
                      _submitted.current
                      ? "Only one submission is allowed."
                      : !userId && "Log in to submit to this battle."
                    }
            >
            <span
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
            >
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
              disabled={_submitted.current || !userId}
            >
              Enter
            </Button>
            </span>
            </Tooltip>
          </Box>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

BattleCard.propTypes = {
  battleId: PropTypes.string
};

export { BattleCard };
