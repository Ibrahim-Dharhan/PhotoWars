import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { redirect, useLoaderData, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { VariantContext } from '../battleView/BattleView';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 2,
};

const commentModalLoader = async ({ params, request }) => {
  const postId = params.postId;
  const variant = (new URL(request.url)).searchParams.get('variant');
  if (!variant) return redirect('..');
  const commentsPath = `/${variant}/${postId}/comments`;
  const postPath = `/${variant}/${postId}`;
  try {
    const commentsRes = await axios.get(commentsPath);
    const postRes = await axios.get(postPath);
    return {comments: commentsRes.data, post: postRes.data};
  } catch (err) {
    if (err.response.status === 404) {
      return redirect('/404');
    }
  }
};

interface Author {
  _id: string;
  description: string;
  displayName: string;
  filename: string;
  firstName: string;
  lastName: string;
}

interface Comment {
  _id: string;
  __v: number;
  author: Author | null;
  commentedModel: string;
  creationTime: string;
  post: string;
  text: string;
}

interface Post {
  _id: string;
  author: Author | null;
  caption: string;
  filename: string;
}

const CommentModal = () => {
  const { variant } = useOutletContext<VariantContext>();
  const { comments, post } = useLoaderData() as {comments: Comment[], post: Post};
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  /* useEffect for retrieving the image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(post.filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    try {
      setImage();
    } catch (err) {
      console.error(err);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [post.filename]);

  const handleClose = () => {
    navigate('..');
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        <Grid direction='row' container spacing={1} sx={{height: "100%"}}>
          <Grid item xs={6}>
            <Box sx={{height:'100%', display: 'flex'}} alignItems='center'>
              <img src={imageUrl} alt={`${variant} image`} width='100%'/>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar>
                    {post.author?.displayName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='h6'
                        color='text.primary'
                      >
                        {post.caption}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        Created by {post.author?.displayName}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              {comments.map((comment: Comment) => {
                return (
                  <div key={comment._id}>
                    <ListItem
                      className='comment-modal-comment'
                      alignItems='flex-start'
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        navigate(`/users/${comment.author._id}`);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>{comment.author.displayName[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              {comment.author.displayName + '\n'}
                            </Typography>
                            {comment.text}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant='inset' component='li' />
                  </div>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

CommentModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  variant: PropTypes.string,
  id: PropTypes.string,
  displayName: PropTypes.string,
  caption: PropTypes.string,
  filename: PropTypes.string,
};

export { CommentModal, commentModalLoader };
