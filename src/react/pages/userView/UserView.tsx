import React, { useEffect, useRef, useState } from 'react';
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
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';

const userViewLoader = async ({ params }) => {
  const id = params.id;
  const path = `/user/${id}`;
  const res = await axios.get(path);
  return res.data;
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
  const [feed, setFeed] = useState('battles');
  const [battles, setBattles] = useState(null);
  const [submissions, setSubmissions] = useState(null);
  const [comments, setComments] = useState(null);
  useEffect(() => {
    let shouldUpdate = true;
    const setUserData = async () => {
      const pathBattle = `/user/${user._id}/battles`;
      const resBattles = await axios.get(pathBattle);
      const pathSubmissions = `/user/${user._id}/submissions`;
      const resSubmissions = await axios.get(pathSubmissions);
      const pathComments = `/user/${user._id}/comments`;
      const resComments = await axios.get(pathComments);
      if (shouldUpdate) {
        setBattles(resBattles.data);
        console.log(resBattles.data);
        setSubmissions(resSubmissions.data);
        setComments(resComments.data);
      }
    };
    try {
      setUserData();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Card sx={{ padding: '1em', width: '100$' }}>
        <UserHeader user={user} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Toolbar
              sx={{
                // background: 'aqua',
                marginX: '2em',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant='contained'
                component='div'
                onClick={() => {
                  setFeed('battles');
                }}
              >
                Battles
              </Button>
              <Button
                variant='contained'
                component='div'
                onClick={() => {
                  setFeed('submissions');
                }}
              >
                Submissions
              </Button>
              <Button
                variant='contained'
                component='div'
                onClick={() => {
                  setFeed('comments');
                }}
              >
                Comments
              </Button>
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            {feed === 'battles' && battles ? (
              battles.map((battle) => {
                return (
                  <BattleCard
                    battleId={battle._id}
                    numBVSubmissions={null}
                    setNumBVSubmissions={null}
                    showModal={null}
                    key={battle._id}
                  />
                );
              })
            ) : feed === 'submissions' && submissions ? (
              submissions.map((submission) => {
                return (
                  <SubmissionCard
                    submissionId={submission._id}
                    showModal={null}
                    key={submission._id}
                  />
                );
              })
            ) : feed === 'comments' && comments ? (
              <div>comments</div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export { UserView, userViewLoader };
