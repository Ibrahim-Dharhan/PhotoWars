"use strict"
import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  postId,
  variant
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleClose = () => {
    !deleting && setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    const path = `/${variant}${postId ? '/' : ''}${postId || ''}`;
    try {
      !deleting && await axios.delete(path);
      setDeleting(true);
      if (location.pathname.startsWith(`/${variant}`)) {
        navigate('/');
      } else {
        navigate(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteDialog}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <DialogTitle>
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this {variant}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export { DeleteDialog };
