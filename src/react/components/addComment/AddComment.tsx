import * as React from 'react';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  TextField,
} from '@mui/material';

interface IProps {
  postComment: (newComment: string) => Promise<void>;
}

const AddComment = ({ postComment }: IProps) => {
  const [commentText, setCommentText] = useState('');

  return (
    <Card>
      <Box sx={{ p: '15px' }}>
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          <Avatar/>
          <TextField
            fullWidth
            placeholder='Add a comment'
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
          <Button
            size='large'
            variant='contained'
            onClick={(e) => {
              if (commentText.trim()) {
                console.log(commentText.trim());
                postComment(commentText.trim());
              } else {
                e.preventDefault();
              }
              setCommentText('');
            }}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default AddComment;