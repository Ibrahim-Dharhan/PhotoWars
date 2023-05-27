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
import { UserContext } from '../../contexts/UserContext';

const DeleteDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  postId,
  variant
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const { setDisplayName, setUserId } = useContext(UserContext);

  const handleClose = () => {
    !deleting && setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    const path = `/${variant}${postId ? '/' : ''}${postId || ''}`;
    try {
      !deleting && await axios.delete(path);
      if (location.pathname.startsWith(`/${variant}`)) {
        navigate('/');
      } else {
        navigate(0);
      }
      if (variant === 'user') {
        /* Log user out and update state.  */
        const path = '/account/logout';
        await axios.post(path);
        setDisplayName('');
        setUserId('');
        localStorage.removeItem('user');
      }
      setDeleting(true);
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
