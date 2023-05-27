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
import './battleCard.css';

const BattleCard = ({
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
        <PostCardHeader _post={_battle} />
        <ButtonBase
          onClick={() => {
            showModal &&
            showModal('battle', battleId, displayName, caption, filename);
          }}
          sx={{ width: '100%' }}
        >
          <CardMedia
            component='img'
            image={imageUrl}
            loading='lazy'
          />
        </ButtonBase>
        <CardContent sx={{ mb: -3 }}>
          <Typography variant="h6">{caption}</Typography>
        </CardContent>
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
                color: submitted && blue[500],
              }}
            />
            <Typography>{numSubmissions}</Typography>
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
            <FavoriteIcon sx={{ pr: 1, color: voted && pink[500] }} />
            <Typography>{numVotes}</Typography>
          </IconButton>
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <ModeCommentOutlinedIcon
              sx={{ pr: 1, color: commented && pink[500] }}
            />
            <Typography>{numComments}</Typography>
          </IconButton>
          <Box display='flex' marginLeft='auto' alignItems='center'>
            {timeRemaining === '00d:00h:00m:00s' ? (
              <Typography>Finished</Typography>
            ) : (
              <>
                <Typography sx={{ pr: 2 }}>{timeRemaining}</Typography>
                <Tooltip
                  title={
                    submitted
                      ? 'Only one submission is allowed.'
                      : !userId && 'Log in to submit to this battle.'
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
                      variant='outlined'
                      size='small'
                      color='primary'
                      disabled={
                        submitted ||
                        !userId ||
                        location.pathname.endsWith('submit')
                      }
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
  setNumBVSubmissions: PropTypes.func,
  showModal: PropTypes.func,
};

export { BattleCard };
