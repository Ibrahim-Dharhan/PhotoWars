import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  ButtonBase,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { pink } from '@mui/material/colors';
import { UserContext } from '../../contexts/UserContext';
import { PostCardHeader } from '../postCardHeader/PostCardHeader';
import { updateDeadline } from '../../../definitions/timerLogic';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './submissionCard.css';

const SubmissionCard = ({ submissionId }) => {
  const { userId, setOpen } = useContext(UserContext);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [numComments, setNumComments] = useState(0);
  const [commented, setCommented] = useState(false);
  const [expired, setExpired] = useState(true);
  const [numVotes, setNumVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  const _isAuthor = useRef(false);
  const _submission = useRef(null);
  const _timerEvent = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  /* useEffect for updating caption, display name, and image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setSubmissionInformation = async () => {
      const path = `/submission/${submissionId}`;
      const res = await axios.get(path);
      const submission = res.data;

      if (shouldUpdate) {
        setCaption(submission.caption);
        setFilename(submission.filename);
        setNumComments(submission.numComments);
        setCommented(submission.commentedOn);
        setNumVotes(submission.numVotes);
        setVoted(submission.votedOn);
        _isAuthor.current = submission.author._id;
        _submission.current = submission;
        updateDeadline(
          new Date(submission.battle.deadline),
          _timerEvent,
          null,
          setExpired,
          expired
        );
      }
    };
    try {
      setSubmissionInformation();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [expired, location, submissionId, userId]);

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

  const openCommentModal = () => {
    navigate({
      pathname: `comments/${submissionId}`,
      search: createSearchParams({
        postType: 'submission'
      }).toString()
    });
  }

  const vote = async () => {
    const path = `/submission/${submissionId}/${voted ? 'unvote' : 'vote'}`;
    try {
      await axios.put(path);
      setVoted(!voted);
      setNumVotes(numVotes + (voted ? -1 : 1));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Card variant='outlined' sx={{ height: 475, width: '100%' }}>
      <CardActionArea component='div'>
        <PostCardHeader _post={_submission} />
        <CardContent sx={{ mt: -3 }}>
          <Typography noWrap variant='h6'>
            {caption}
          </Typography>
        </CardContent>
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
            sx={{ height: 300, objectFit: 'contain' }}
          />
        </ButtonBase>
        <CardActions disableSpacing>
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              if (userId !== '' && !expired) {
                vote();
              } else {
                setOpen(true);
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
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

SubmissionCard.propTypes = {
  submissionId: PropTypes.string
};

export { SubmissionCard };