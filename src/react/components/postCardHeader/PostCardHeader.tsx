"use strict";

import React from 'react';
import {
  Avatar,
  CardHeader,
  IconButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const PostCardHeader = ({
  _post
}) => {
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
  return (
    <CardHeader
      avatar={
        <Avatar
            sx={{ width: 24, height: 24 }}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              console.log(
                `Go to profile page at /user/${_post.current?.author._id}`
              );
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
            console.log(
              `Go to profile page at /user/${_post.current?.author._id}`
            );
            navigate(`/users/${_post.current?.author._id}`);
          }}
        >
          {_post.current?.author.displayName}
        </Link>
      }
      action={
        <IconButton
          onMouseDown={(event) => event.stopPropagation()}
          onClick={handleDownload}
        >
          <DownloadIcon />
        </IconButton>
      }
    />
  );
}

PostCardHeader.propTypes = {
  _post: PropTypes.object
};

export { PostCardHeader };
