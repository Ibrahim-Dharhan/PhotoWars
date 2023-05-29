import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { UserContext } from '../../contexts/UserContext';
import { CommentFrontend } from '../../../definitions/classes/commentFrontend';
import { ILayoutUserContext } from '../../pages/Layout';

interface IProps {
  commentId: string;
}

const CommentCard = ({ commentId }: IProps) => {
  const { loggedInUser } = useContext(UserContext) as ILayoutUserContext;
  const [battleViewPath, setBattleViewPath] = useState('');
  const [comment, setComment] = useState(new CommentFrontend());
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let shouldUpdate = true;
    const setCommentInfo = async () => {
      const path = `/comment/${commentId}`;
      const res = await axios.get(path);
      if (shouldUpdate) {
        setComment(res.data);
        const pathToBattle = `/battles/${
          comment.commentedModel === 'Battle'
          ? res.data.post._id
          : res.data.post.battle
        }`;
        setBattleViewPath(pathToBattle);
      }
    };
    try {
      setCommentInfo();
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
    }
    return () => {
      shouldUpdate = false;
    };
  }, [commentId, comment.commentedModel, loggedInUser._id]);

  /* useEffect for retrieving the image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(comment.post.filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    setImage();
    return () => {
      shouldUpdate = false;
    };
  }, [comment.post.filename]);

  return (
    <Card
      className='comment-card'
      sx={{ marginBottom: '20px' }}
      onClick={(event) => {
        event.stopPropagation();
        navigate(battleViewPath);
      }}
    >
      <Grid container spacing={2} sx={{ padding: 0 }}>
        <Grid item xs={4}>
          <CardMedia
            component='img'
            src={imageUrl}
            sx={{ height: 'auto' }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 'bold' }}>{comment.post.caption}</Typography>
          <Typography>{comment.text}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentCard;
