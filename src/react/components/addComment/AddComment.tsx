import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  TextField,
} from "@mui/material";
import PropTypes from 'prop-types';


const AddComment = ({ postComment }) => {
  const [commentText, setCommentText] = useState("");

  return (
    <Card>
      <Box sx={{ p: "15px" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar/>
          <TextField
            fullWidth
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
          <Button
            size="large"
            sx={{
              bgcolor: "custom.moderateBlue",
              color: "neutral.white",
              p: "8px 25px",
              "&:hover": {
                bgcolor: "custom.lightGrayishBlue",
              },
            }}
            onClick={(e) => {
              if (commentText.trim()) {
                console.log(commentText.trim());
                postComment(commentText.trim());
              } else {
                e.preventDefault();
              }
              setCommentText("");
            }}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

AddComment.propTypes = {
  handlePostComment: PropTypes.func
};

export default AddComment;