"use strict";

import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  CardHeader,
  IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PropTypes from 'prop-types';
import { DeleteDialog } from '../deleteDialog/DeleteDialog';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const PostCardHeader = ({
  _post
}) => {
  const { loggedInUser } = useContext(UserContext);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const handleDownload = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const url = `/image/${_post.current?.filename}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = _post.current?.filename;
    link.click();
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenDeleteDialog(true);
  };

  return (
    <CardHeader
      avatar={
        <Avatar
            sx={{ width: 24, height: 24 }}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              navigate(`/users/${_post.current?.author._id}`);
            }}
        >
          {_post.current?.author.displayName[0]}
        </Avatar>
      }
      title={
        <Link
          to=''
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            navigate(`/users/${_post.current?.author._id}`);
          }}
          style={{ 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          {_post.current?.author.displayName}
        </Link>
      }
      action={
        <React.Fragment>
          {
            loggedInUser._id === _post.current?.author._id
            && <Button
              onMouseDown={(event) => event.stopPropagation()}
              onClick={handleDelete}
              size="small"
              sx={{ color: 'red' }}
            >
              Delete
            </Button>
          }
          <DeleteDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            postId={_post.current?._id}
            postType={_post.current?.battle ? 'submission' : 'battle'}
          />
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={handleDownload}
          >
            <DownloadIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

PostCardHeader.propTypes = {
  _post: PropTypes.object
};

export { PostCardHeader };
