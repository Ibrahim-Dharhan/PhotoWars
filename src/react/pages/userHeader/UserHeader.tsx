import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { DeleteDialog } from '../../components/deleteDialog/DeleteDialog';
import { IUserFrontend } from '../../../definitions/schemas/mongoose/user';
import { Link, useOutletContext } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

interface UVUserHeaderState {
  user: IUserFrontend
}

const UserHeader = () => {
  const { user } = useOutletContext() as UVUserHeaderState;
  const { userId } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(user.filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    setImage();
    return () => {
      shouldUpdate = false;
    };
  }, [user.filename]);

  return (
    <Box display='flex' sx={{ padding: '1em' }}>
      <Grid
        sx={{
          minWidth: '15%',
          minHeight: '15%',
          position: 'relative'
        }}
      >
        <Avatar
          src={imageUrl || null}
          sx={{
            position: 'absolute',
            minWidth: '100%',
            height: 'auto',
            aspectRatio: '1',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </Grid>
      <Box paddingLeft={2}>
        <Typography
          style={{ fontWeight: 'bold', fontSize: '2.5em', marginBottom: '-5%' }}
        >{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography
          style={{
            fontWeight: 'lighter',
            fontSize: '1.8em',
            margin: '0',
            color: 'grey',
            marginBottom: '-1%',
          }}
        >{`@${user.displayName}`}</Typography>
        <Typography style={{ fontSize: '1.2em', marginLeft: '5px' }}>
          Fun Fact: {user.description}
        </Typography>
      </Box>
      {
        user._id === userId &&
        <Stack
          direction="row"
          sx={{marginBottom: 'auto', marginLeft: 'auto'}}
        >
          <Button
            onMouseDown={(event) => event.stopPropagation()}
            onClick={handleDelete}
            sx={{ color: 'red', padding: '0px' }}
          >
            Delete
          </Button>
          <DeleteDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            postId={null}
            postType={'user'}
          />
          <Button
            component={Link}
            to="edit"
            sx={{ padding: '0px' }}
          >
            Edit
          </Button>
        </Stack>
      }
    </Box>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object,
};

export { UserHeader };
