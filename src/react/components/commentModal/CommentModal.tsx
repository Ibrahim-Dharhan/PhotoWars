import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography
} from '@mui/material'
import '../submissionCard/submissionCard.css';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '2px',
  p: 2
};

interface Comment {
  _id: string;
  __v: number;
  author: any;
  commentedModel: string;
  creationTime: string;
  filename: string;
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
  filename
}) => {
  const [comments, setComments] = useState([]);

  /* useEffect for updating comments.  */
  useEffect(() => {
    if (!open) return;
    let shouldUpdate = true;
    const getComments = async() => {
      const path = `/${variant}/${id}/comments`;
      const res = await axios.get(path);
      const retrievedComments: Comment[] = res.data;

      if (shouldUpdate) {
        setComments(retrievedComments);
      }
    };
    try {
      getComments();
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, [id]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card>
              <CardMedia
                component="img"
                image={`/image/${filename}`}
                loading="lazy"
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    {displayName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={caption}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {displayName}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              {comments.map((comment: Comment) => {
                return (
                <div key={comment._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        {comment.author.displayName[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.author.displayName + '\n'}
                          </Typography>
                          {comment.text}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>)
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
  filename: PropTypes.string
};

export { CommentModal };
