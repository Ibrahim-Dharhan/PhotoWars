import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography
} from '@mui/material'
import '../submissionCard/submissionCard.css';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '2px',
  p: 2
};

const SubmissionModal = ({
  open, 
  handleClose,
  displayName,
  caption,
  filename
}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card>
              <CardMedia
                component="img"
                image={`/image/${filename}`}
                loading="lazy"
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {displayName[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Title of submission"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {displayName + ': '}
                      </Typography>
                      {caption}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Avatar" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Commenter 1
                      </Typography>
                      {" This is a comment."}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Avatar" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Commenter 2
                      </Typography>
                      {" This is another comment."}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
            <Button></Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

SubmissionModal.propTypes = {
  submissionId: PropTypes.string
};

export { SubmissionModal };
