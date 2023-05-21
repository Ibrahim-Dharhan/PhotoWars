import React, { useState } from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import { Typography, Avatar, Box, Card } from '@mui/material';

const UserHeader = ({ user }) => {
  return (
    <Box display='flex' sx={{ padding: '1em' }}>
      <Avatar
        alt='Userpic'
        src={`/image/${user.filename}`}
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
    </Box>
  );
};

export { UserHeader };
