import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Typography
} from '@mui/material';
import { getImage } from '../../../definitions/getImage';
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

  useEffect(() => {
    getImage(user.filename, setImageUrl);
  }, [user.filename]);

  return (
    <Box display='flex' sx={{ padding: '1em' }}>
      <Avatar
        alt='Userpic'
        src={imageUrl}
        sx={{ width: '15%', height: '15%' }}
      />
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
        <Button
          component={Link}
          to="edit"
          sx={{marginBottom: 'auto', marginLeft: 'auto'}}
        >
          Edit
        </Button>
      }
    </Box>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object,
};

export { UserHeader };
