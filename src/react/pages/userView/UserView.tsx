import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { LoaderFunction, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
import CommentCard from '../../components/commentCard/CommentCard';

const userViewLoader: LoaderFunction = async ({ params }) => {
  const id = params['id'];
  const path = `/user/${id}`;
  const res = await axios.get(path);
  return res.data;
};

interface IUser {
  _id: string;
  description: string;
  displayName: string;
  filename: string;
  firstName: string;
  lastName: string;
}

const UserView = () => {
  const navigate = useNavigate();

  const user = useLoaderData() as IUser;
  const [feed, setFeed] = useState('battles');
  const [battles, setBattles] = useState<{_id: string}[] | null>(null);
  const [submissions, setSubmissions] = useState<{_id: string, battle: string}[] | null>(null);
  const [comments, setComments] = useState<{_id: string}[] | null>(null);

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
        setSubmissions(resSubmissions.data);
        setComments(resComments.data);
      }
    };
    try {
      setUserData();
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
    }
    return () => {
      shouldUpdate = false;
    };
  }, [user._id]);

  return (
      <Stack alignItems="center">
      <Card sx={{ padding: '1em', maxWidth: '60%' }}>
        <Outlet context={{user}} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Toolbar
              sx={{
                justifyContent: 'space-evenly',
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
            <Stack
              alignItems="center"
              sx={{
                width: '100%'
              }}
            >
              {feed === 'battles' && battles ? (
                battles.length > 0 ? (
                  battles.map((battle) => {
                    return (
                      <BattleCard
                        key={battle._id}
                        battleId={battle._id}
                      />
                    );
                  })
                ) : (
                  <Typography textAlign={'center'}>
                    This user has no battles!
                  </Typography>
                )
              ) : feed === 'submissions' && submissions ? (
                submissions.length > 0 ? (
                  submissions.map((submission) => {
                    return (
                      <Box
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/battles/${submission.battle}`);
                        }}
                        key={submission._id}
                        sx={{ marginBottom: '5px' }}
                      >
                        <SubmissionCard
                          submissionId={submission._id}
                        />
                      </Box>
                    );
                  })
                ) : (
                  <Typography textAlign={'center'}>
                    This user has no submissions!
                  </Typography>
                )
              ) : feed === 'comments' && comments ? (
                comments.length > 0 ? (
                  comments.map((comment) => {
                    return <CommentCard key={comment._id} commentId={comment._id} />;
                  })
                ) : (
                  <Typography textAlign={'center'}>
                    This user has no comments!
                  </Typography>
                )
              ) : (
                <></>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>
      </Stack>
  );
};

export { UserView, userViewLoader };
