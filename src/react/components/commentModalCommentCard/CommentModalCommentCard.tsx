import * as React from 'react';
import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { getImageUrl } from '../../../definitions/getImageUrl';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { ILayoutUserContext } from '../../pages/Layout';

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
  author: Author;
  commentedModel: string;
  creationTime: string;
  post: Post;
  text: string;
}

interface Post {
  _id: string;
  author: Author;
  caption: string;
  filename: string;
}

interface IProps {
  comment: Comment;
}

const CommentModalCommentCard = ({ comment }: IProps) => {
  // const { loggedInUser } = useContext(UserContext) as ILayoutUserContext;
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  /* useEffect for retrieving the image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(comment.author.filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    try {
      setImage();
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
  }, [comment.author.filename]);

  return (
    <React.Fragment>
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
          <Avatar src={imageUrl}>{comment.author.displayName[0]}</Avatar>
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
    </React.Fragment>
  );
};

export { CommentModalCommentCard };
