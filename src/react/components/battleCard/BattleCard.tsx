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
import { blue, pink } from '@mui/material/colors';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './battleCard.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';

const BattleCard = ({
  battleId, numBVSubmissions, setNumBVSubmissions
}) => {
  const { userId, setOpen } = useContext(UserContext);

  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [filename, setFilename] = useState('');
  const [numSubmissions, setNumSubmissions] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [numVotes, setNumVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('--:--:--');

  const _battle = useRef(null);
  const _timerEvent = useRef(null);

  const location = useLocation();
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
    const setBattleInformation = async () => {
      const path = `/battle/${battleId}`;
      const res = await axios.get(path);
      const battle = res.data;

      if (shouldUpdate) {
        setCaption(battle.caption);
        setDisplayName(battle.author.displayName);
        setFilename(battle.filename);
        _battle.current = battle;
        updateDeadline(new Date(battle.deadline), _timerEvent, setTimeRemaining);
      }
    };
    try {
      setBattleInformation();
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, [battleId]);

  /* useEffect for updating vote and submission count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getSubmissionsAndVotes = async () => {
      const votesPath = `/vote/${battleId}`;
      const votesRes = await axios.get(votesPath);
      const { numVotes, votedOn } = votesRes.data;

      const submissionsPath = `/battle/${battleId}/submissions`;
      const submissionsRes = await axios.get(submissionsPath);

      if (shouldUpdate) {
        setVoted(votedOn);
        setNumVotes(numVotes);

        if (setNumBVSubmissions) setNumBVSubmissions(submissionsRes.data.length);
        setNumSubmissions(submissionsRes.data.length);
        setSubmitted(submissionsRes.data
          .map(submission => submission.author)
          .includes(userId));
      }
    };
    try {
      getSubmissionsAndVotes();
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, [battleId, numBVSubmissions, numSubmissions, setNumBVSubmissions, userId]);

  const vote = async () => {
    const path = `/battle/${battleId}/${voted ? 'unvote' : 'vote'}`;
    try {
      await axios.put(path);
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
          if (location.pathname === '/' || location.pathname.startsWith('/users')) {
            console.log("Open post");
            navigate(`/battles/${battleId}`);
          }
        }}
        onMouseDown={(event) => {
          if (location.pathname !== '/') {
            event.stopPropagation();
          }
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
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(`Go to profile page at /user/${_battle.current.author._id}`);
              }}
            >
              {displayName}
            </Link>
          }
          action={
            <IconButton
              onMouseDown={(event) => event.stopPropagation()}
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
                color: (submitted && blue[500])
              }}
            />
            <Typography>
              {numSubmissions}
            </Typography>
          </IconButton>
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
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
            {timeRemaining === '00d:00h:00m:00s' ? (
              <Typography>
                Finished
              </Typography>
            ) : (
              <>
                <Typography sx={{ pr: 2 }}>
                  {timeRemaining}
                </Typography>
                <Tooltip
                  title={
                    submitted
                      ? "Only one submission is allowed."
                      : !userId && "Log in to submit to this battle."
                  }
                >
                  <span
                    onClick={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.stopPropagation()}
                  >
                    <Button
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        console.log('Open submit page');
                        navigate(`/battles/${battleId}/submit`);
                      }}
                      variant="outlined"
                      size="small"
                      color="primary"
                      disabled={submitted || !userId || location.pathname.endsWith('submit')}
                    >
                      Enter
                    </Button>
                  </span>
                </Tooltip>
              </>
            )}
          </Box>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

BattleCard.propTypes = {
  battleId: PropTypes.string,
  numBVSubmissions: PropTypes.number,
  setNumBVSubmissions: PropTypes.func
};

export { BattleCard };
