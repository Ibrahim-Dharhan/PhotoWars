import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Typography
} from '@mui/material';
import { getImage } from '../../../definitions/getImage';
import { Link, useOutletContext } from 'react-router-dom';
import { IUserFrontend } from '../../../definitions/schemas/mongoose/user';

interface UVUserHeaderEditState {
  user: IUserFrontend
}

const UserHeaderEdit = () => {
  const { user } = useOutletContext() as UVUserHeaderEditState;
  console.log(user);
  const [imageUrl, setImageUrl] = useState('');

  const handleSaveOnClick = () => {
    console.log('Saving profile');
  };

  useEffect(() => {
    getImage(user.filename, setImageUrl);
  }, [user.filename]);

  return (
    <Box display='flex' sx={{ border: '1px dashed grey', padding: '1em' }}>
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
      <Button
        component={Link}
        onClick={handleSaveOnClick}
        sx={{marginBottom: 'auto', marginLeft: 'auto'}}
        to=".."
      >
        Save
      </Button>
    </Box>
  );
};

UserHeaderEdit.propTypes = {
  user: PropTypes.object,
};

export { UserHeaderEdit };
