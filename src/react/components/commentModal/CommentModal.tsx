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
import { useNavigate } from 'react-router-dom';
import AddComment from '../addComment/AddComment';

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

interface Author {
  _id: string;
  displayName: string;
}

interface Comment {
  _id: string;
  __v: number;
  author: Author;
  commentedModel: string;
  creationTime: string;
  post: string;
  text: string;
}

const CommentModal = ({
  open,
  handleClose,
  variant,
  id,
  displayName,
  caption,
  filename,
}) => {
  const [comments, setComments] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const getComments = async (shouldUpdate: boolean) => {
    const path = `/${variant}/${id}/comments`;
    const res = await axios.get(path);
    const retrievedComments: Comment[] = res.data;

    if (shouldUpdate) {
      setComments(retrievedComments);
    }
  };

  /* useEffect for updating comments.  */
  useEffect(() => {
    if (!open) return;
    let shouldUpdate = true;
    try {
      getComments(shouldUpdate);
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [id, open, variant]);

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

  /* Handler for posting a new comment. */
  const handlePostComment = async (newComment: String) => {
    const path = `/${variant}/${id}/comment`;
    try {
      const res = await axios.post(path, {comment: newComment});
      getComments(true);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <Modal
      open={open}
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
                    {displayName[0]}
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
                        {caption}
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
                        Created by {displayName}
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
                        console.log(
                          `Go to profile page at /user/${comment.author._id}`
                        );
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
            <AddComment 
              postComment={handlePostComment}
            />
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

export { CommentModal };
