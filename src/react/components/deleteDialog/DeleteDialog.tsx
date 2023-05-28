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
import { LoggedInUser, UserContext } from '../../contexts/UserContext';
import PropTypes from 'prop-types';

const DeleteDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  postId,
  postType
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const { setLoggedInUser } = useContext(UserContext);

  const handleClose = () => {
    !deleting && setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    const path = `/${postType}${postId ? '/' : ''}${postId || ''}`;
    try {
      !deleting && await axios.delete(path);
      if (location.pathname.startsWith(`/${postType}`)) {
        navigate('/');
      } else {
        navigate(0);
      }
      if (postType === 'user') {
        /* Log user out and update state.  */
        const path = '/account/logout';
        await axios.post(path);
        setLoggedInUser(new LoggedInUser());
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
            Do you want to delete this {postType}? This action cannot be undone.
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

DeleteDialog.propTypes = {
  openDeleteDialog: PropTypes.bool,
  setOpenDeleteDialog: PropTypes.func,
  postId: PropTypes.string,
  postType: PropTypes.string
};

export { DeleteDialog };
