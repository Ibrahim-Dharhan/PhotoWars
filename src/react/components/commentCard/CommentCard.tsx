import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

const CommentCard = ({ comment }) => {
  const navigate = useNavigate();
  const [img, setImg] = useState('');
  const [caption, setCaption] = useState('');
  const [battleView, setBattleView] = useState('');
  useEffect(() => {
    let shouldUpdate = true;
    const setImgPath = async () => {
      const path =
        comment.commentedModel === 'Battle'
          ? `/battle/${comment.post}`
          : `/submission/${comment.post}`;
      const res = await axios.get(path);
      if (shouldUpdate) {
        setImg(res.data.filename);
        setCaption(res.data.caption);
        const linkToView = `/battles/${
          comment.commentedModel === 'Battle' ? res.data._id : res.data.battle
        }`;
        setBattleView(linkToView);
      }
    };
    try {
      setImgPath();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  });
  return (
    <Card
      className='comment-card'
      sx={{ marginBottom: '20px' }}
      onClick={(event) => {
        event.stopPropagation();
        navigate(battleView);
      }}
    >
      <Grid container spacing={2} sx={{ padding: 0 }}>
        <Grid item xs={4}>
          <CardMedia
            component='img'
            src={`/image/${img}`}
            sx={{ height: 'auto' }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 'bold' }}>{caption}</Typography>
          <Typography>{comment.text}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object,
};

export default CommentCard;
