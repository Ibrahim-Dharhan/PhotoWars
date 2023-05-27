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
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { pink } from '@mui/material/colors';
import './submissionCard.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';
import { PostCardHeader } from '../postCardHeader/PostCardHeader';

const SubmissionCard = ({ submissionId, showModal }) => {
  const { userId, setOpen } = useContext(UserContext);
  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [filename, setFilename] = useState('');
  const [numComments, setNumComments] = useState(0);
  const [commented, setCommented] = useState(false);
  const [numVotes, setNumVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  const _isAuthor = useRef(false);
  const _submission = useRef(null);

  /* useEffect for updating caption, display name, and image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setSubmissionInformation = async () => {
      const path = `/submission/${submissionId}`;
      const res = await axios.get(path);
      const submission = res.data;

      if (shouldUpdate) {
        setCaption(submission.caption);
        setDisplayName(submission.author.displayName);
        setFilename(submission.filename);
        _isAuthor.current = submission.author._id;
        _submission.current = submission;
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
  }, [submissionId]);

  /* useEffect for updating comment and vote count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getCommentsAndVotes = async () => {
      const commentsPath = `/comment/${submissionId}`;
      const commentsRes = await axios.get(commentsPath);
      const { numComments, commentedOn } = commentsRes.data;

      const votesPath = `/vote/${submissionId}`;
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
  }, [submissionId, userId]);

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
          onClick={() =>
            showModal &&
            showModal(
              'submission',
              submissionId,
              displayName,
              caption,
              filename
            )
          }
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
            }}
          ></IconButton>
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
              event.stopPropagation();
              event.preventDefault();
              showModal &&
              showModal(
                'submission',
                submissionId,
                displayName,
                caption,
                filename
              )
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
  submissionId: PropTypes.string,
  showModal: PropTypes.func,
};

export { SubmissionCard };
