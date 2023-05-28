import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
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
import { updateDeadline } from '../../../definitions/timerLogic';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './battleCard.css';

const BattleCard = ({
  battleId,
}) => {
  const { loggedInUser, setOpenLoginModal } = useContext(UserContext);
  const [caption, setCaption] = useState('');
  const [filename, setFilename] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [numSubmissions, setNumSubmissions] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [commented, setCommented] = useState(false);
  const [numVotes, setNumVotes] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [voted, setVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('--:--:--');
  const [expired, setExpired] = useState(true);

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
        setFilename(battle.filename);
        setNumComments(battle.numComments);
        setCommented(battle.commentedOn);
        setNumSubmissions(battle.numSubmissions);
        setSubmitted(battle.submittedTo);
        setNumVotes(battle.numVotes);
        setVoted(battle.votedOn);
        _battle.current = battle;
        updateDeadline(
          new Date(battle.deadline),
          _timerEvent,
          setTimeRemaining,
          setExpired,
          expired
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
  }, [battleId, expired, location, loggedInUser._id]);

  /* useEffect for retrieving the image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    try {
      setImage();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [filename]);

  const openCommentModal = () => {
    navigate({
      pathname: `/battles/${battleId}/comments/${battleId}`,
      search: createSearchParams({
        postType: 'battle'
      }).toString()
    });
  }

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
            openCommentModal();
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
              event.preventDefault();
            }}
            disableRipple
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
              if (loggedInUser._id !== '' && !expired) {
                vote();
              } else {
                setOpenLoginModal(true);
              }
            }}
            disableRipple={expired}
          >
            {
              expired
              ? <LockIcon sx={{ pr: 1, color: voted && pink[500] }} />
              : <FavoriteIcon sx={{ pr: 1, color: voted && pink[500] }} />
            }
            <Typography>{numVotes}</Typography>
          </IconButton>
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              openCommentModal();
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
                      : !loggedInUser && 'Log in to submit to this battle.'
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
                        !loggedInUser ||
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
  battleId: PropTypes.string
};

export { BattleCard };
