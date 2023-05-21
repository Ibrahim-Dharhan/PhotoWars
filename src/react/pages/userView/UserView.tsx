import React, { useState } from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import {
  Typography,
  Avatar,
  Box,
  Card,
  Grid,
  Toolbar,
  Button,
} from '@mui/material';
import { UserHeader } from '../../components/userHeader/UserHeader';

const userViewLoader = async ({ params }) => {
  const id = params.id;
  const path = `/user/${id}`;
  const res = await axios.get(path);
  return res.data;
  console.log('Loading user data');
};

interface User {
  _id: string;
  __v: number;
  description: String;
  displayName: String;
  filename: String;
  firstName: String;
  lastName: String;
  loginName: String;
  loginPassword: String;
}

const UserView = () => {
  const user = useLoaderData() as User;
  return (
    <React.Fragment>
      <Card sx={{ padding: '1em', width: '100$' }}>
        <UserHeader user={user} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Toolbar
              sx={{
                background: 'aqua',
                textAlign: 'center',
              }}
            >
              <Button
                variant='text'
                component='div'
                sx={{ flexGrow: 1, color: 'black' }}
              >
                Battles
              </Button>
              <Button
                variant='text'
                component='div'
                sx={{ flexGrow: 1, color: 'black' }}
              >
                Submissions
              </Button>
              <Button
                variant='text'
                component='div'
                sx={{ flexGrow: 1, color: 'black' }}
              >
                Comments
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export { UserView, userViewLoader };
