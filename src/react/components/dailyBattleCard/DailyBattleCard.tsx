import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageIcon from '@mui/icons-material/Image';
import PropTypes from 'prop-types';
import { blue, pink } from '@mui/material/colors';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { PostCardHeader } from '../postCardHeader/PostCardHeader';
import { updateDeadline } from './timerLogic';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const DailyBattleCard = ({
  battleId,
  numBVSubmissions,
  setNumBVSubmissions,
  showModal,
}) => {
  const { userId, setOpen } = useContext(UserContext);

  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [filename, setFilename] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [numSubmissions, setNumSubmissions] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [numComments, setNumComments] = useState(0);
  const [commented, setCommented] = useState(false);
  const [numVotes, setNumVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('--:--:--');

  const _battle = useRef(null);
  const _timerEvent = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

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
        updateDeadline(
          new Date(battle.deadline),
          _timerEvent,
          setTimeRemaining
        );
      }
    };
    try {
      setBattleInformation();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [battleId]);

  /* useEffect for updating submission count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getSubmissions = async () => {
      const submissionsPath = `/battle/${battleId}/submissions`;
      const submissionsRes = await axios.get(submissionsPath);

      if (shouldUpdate) {
        if (setNumBVSubmissions)
          setNumBVSubmissions(submissionsRes.data.length);
        setNumSubmissions(submissionsRes.data.length);
        setSubmitted(
          submissionsRes.data
            .map((submission) => submission.author)
            .includes(userId)
        );
      }
    };
    try {
      getSubmissions();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [battleId, numBVSubmissions, numSubmissions, setNumBVSubmissions, userId]);

  /* useEffect for updating comment and vote count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getCommentsAndVotes = async () => {
      const commentsPath = `/comment/${battleId}`;
      const commentsRes = await axios.get(commentsPath);
      const { numComments, commentedOn } = commentsRes.data;

      const votesPath = `/vote/${battleId}`;
      const votesRes = await axios.get(votesPath);
      const { numVotes, votedOn } = votesRes.data;

      if (shouldUpdate) {
        setCommented(commentedOn);
        setNumComments(numComments);

        setVoted(votedOn);
        setNumVotes(numVotes);
      }
    };
    try {
      getCommentsAndVotes();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [battleId, userId]);

  /* useEffect for retrieving the image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    setImage();
    return () => {
      shouldUpdate = false;
    };
  }, [filename]);

  return (
    <Card variant='outlined'>
      <CardActionArea
        component='div'
        onClick={() => {
          if (
            location.pathname === '/' ||
            location.pathname.startsWith('/users')
          ) {
            console.log('Open post');
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
          title={
            <Typography variant="h6">Battle of the Day</Typography>
          }
        />
        <CardContent sx={{ mt: -3 }}>
          <Typography variant="h6">{caption}</Typography>
        </CardContent>
        <CardMedia
          component='img'
          image={imageUrl}
          loading='lazy'
        />
        <CardActions disableSpacing>
          <Tooltip
            title={
              submitted
                ? 'Only one submission is allowed.'
                : !userId && 'Log in to submit to this battle.'
            }
          >
            <Box
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
              sx={{ width: '100%' }}
            >
              <Button
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  console.log('Open submit page');
                  navigate(`/battles/${battleId}/submit`);
                }}
                variant='contained'
                disabled={
                  submitted ||
                  !userId ||
                  location.pathname.endsWith('submit')
                }
                fullWidth
              >
                Enter
              </Button>
            </Box>
          </Tooltip>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

DailyBattleCard.propTypes = {
  battleId: PropTypes.string,
};

export { DailyBattleCard };
