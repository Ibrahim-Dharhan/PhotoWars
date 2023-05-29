import * as React from 'react';
import { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  CardHeader,
  IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DeleteDialog } from '../deleteDialog/DeleteDialog';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ILayoutUserContext } from '../../pages/Layout';

interface Author {
  _id: string;
  displayName: string;
}

interface IPost {
  _id: string;
  author: Author;
  battle?: string;
  filename: string;
}

interface IProps {
  post: IPost | null;
}

const PostCardHeader = ({
  post
}: IProps) => {
  const { loggedInUser } = useContext(UserContext) as ILayoutUserContext;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!post?.filename) return;
    const url = `/image/${post?.filename}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = post?.filename;
    link.click();
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    // setOpenDeleteDialog(true);
  };

  return (
    <CardHeader
      avatar={
        <Avatar
            sx={{ width: 24, height: 24 }}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              navigate(`/users/${post?.author._id}`);
            }}
        >
          {post?.author.displayName[0]}
        </Avatar>
      }
      title={
        <Link
          to=''
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            navigate(`/users/${post?.author._id}`);
          }}
          style={{ 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          {post?.author.displayName}
        </Link>
      }
      action={
        <React.Fragment>
          {
            loggedInUser._id === post?.author._id
            && <Button
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => handleDelete(event)}
              size="small"
              sx={{ color: 'red' }}
            >
              Delete
            </Button>
          }
          <DeleteDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            objectId={post?._id}
            objectModel={post?.battle ? 'submission' : 'battle'}
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

export { PostCardHeader };
