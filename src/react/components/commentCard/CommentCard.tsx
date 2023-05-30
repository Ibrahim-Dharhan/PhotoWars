import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { UserContext } from '../../contexts/UserContext';
import { CommentCardInfo, PopulatedCommentFrontend } from '../../../definitions/classes/comment';
import { SubmissionFrontend } from '../../../definitions/classes/submission';
import { BattleFrontend } from '../../../definitions/classes/battle';

interface IProps {
  commentId: string;
}

const CommentCard = ({ commentId }: IProps) => {
  const { loggedInUser } = useContext(UserContext);
  const [battleViewPath, setBattleViewPath] = useState('');
  const [comment, setComment] = useState(new PopulatedCommentFrontend());
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let shouldUpdate = true;
    const setCommentInfo = async () => {
      const path = `/comment/${commentId}`;
      const res = await axios.get<CommentCardInfo>(path);
      if (shouldUpdate) {
        setComment(res.data);
        let battleId: string;
        if (comment.commentedModel === 'Battle') {
          battleId = (res.data.post as BattleFrontend)._id;
        } else {
          battleId = (res.data.post as SubmissionFrontend).post;
        }
        const pathToBattle = `/battles/${battleId}`;
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
          <Typography>{comment.caption}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentCard;
