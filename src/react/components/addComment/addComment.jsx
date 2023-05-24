import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  TextField,
} from "@mui/material";
import { UserContext } from '../../contexts/UserContext';

const AddComment = () => {
  const { userId, setOpen } = useContext(UserContext);
  const { addComment } = useContext(CommentContext);
  const [commentText, setCommentText] = useState("");

  return (
    <Card>
      <Box sx={{ p: "15px" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            src={IMGOBJ.juliusomo}
            variant="rounded"
            alt="user-avatar"
          />
          <TextField
            multiline
            fullWidth
            minRows={4}
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
              !commentText.trim()
                ? e.preventDefault()
                : addComment(commentText.trim());
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

export default AddComment;