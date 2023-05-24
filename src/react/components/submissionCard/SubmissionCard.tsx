import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  ButtonBase,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import './submissionCard.css';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';
import { Block } from '@mui/icons-material';
import { auto } from 'async';

const SubmissionCard = ({ submissionId, showModal }) => {
  const { userId, setOpen } = useContext(UserContext);
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [filename, setFilename] = useState('');
  const [numVotes, setNumVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  const _isAuthor = useRef(false);
  const _submission = useRef(null);

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

  /* useEffect for updating vote count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getVotes = async () => {
      const votesPath = `/vote/${submissionId}`;
      const votesRes = await axios.get(votesPath);
      const { numVotes, votedOn } = votesRes.data;

      if (shouldUpdate) {
        setVoted(votedOn);
        setNumVotes(numVotes);
      }
    };
    try {
      getVotes();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [submissionId, userId]);

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
    <div>
    <Card variant="outlined"
    sx = {{height:475, width: "100%"}}>
      <CardActionArea component="div">
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 24, height: 24 }}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(
                  `Go to profile page at /user/${_submission.current?.author._id}`
                );
                navigate(`/users/${_submission.current?.author._id}`);
              }}
            >
              {displayName[0]}
            </Avatar>
          }
          title={
            <Link
              to=''
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(
                  `Go to profile page at /user/${_submission.current?.author._id}`
                );
                navigate(`/users/${_submission.current?.author._id}`);
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
          <Typography noWrap variant="h6">
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
          sx = {{width: "100%"}}>
          <CardMedia
            component='img'
            image={`/image/${filename}`}
            loading="lazy"
            sx={{height:300, objectFit: "contain"}}
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
        </CardActions>
      </CardActionArea>
    </Card>
    </div>
  );
};

SubmissionCard.propTypes = {
  submissionId: PropTypes.string,
  showModal: PropTypes.func,
};

export { SubmissionCard };
