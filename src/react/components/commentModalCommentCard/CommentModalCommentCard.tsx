import * as React from 'react';
import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { getImageUrl } from '../../../definitions/getImageUrl';
import {
  Avatar,
  Divider,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { PopulatedCommentFrontend } from '../../../definitions/classes/comment';

interface IProps {
  comment: PopulatedCommentFrontend;
}

const CommentModalCommentCard = ({ comment }: IProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');

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
      >
        <ListItemAvatar>
          <Link href={`/users/${comment.author._id}`}>
            <Avatar src={imageUrl}>{comment.author.displayName[0]}</Avatar>
          </Link>
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{
                  display: 'inline'
                }}
                variant='body2'
                color='text.primary'
              >
                <Link href={`/users/${comment.author._id}`}>
                  {comment.author.displayName}
                </Link>
                {'\n'}
              </Typography>
              {comment.caption}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </React.Fragment>
  );
};

export { CommentModalCommentCard };
