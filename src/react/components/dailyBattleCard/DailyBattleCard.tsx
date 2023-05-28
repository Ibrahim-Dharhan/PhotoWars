import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import { getImageUrl } from '../../../definitions/getImageUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const DailyBattleCard = ({
  battleId,
}) => {
  const { loggedInUser } = useContext(UserContext);

  const [caption, setCaption] = useState('');
  const [filename, setFilename] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* useEffect for updating caption and image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setBattleInformation = async () => {
      const path = `/battle/${battleId}`;
      const res = await axios.get(path);
      const battle = res.data;

      if (shouldUpdate) {
        setCaption(battle.caption);
        setFilename(battle.filename);
      }
    };
    try {
      setBattleInformation();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [battleId]);

  /* useEffect for updating submission count.  */
  useEffect(() => {
    let shouldUpdate = true;
    const getSubmissions = async () => {
      const submissionsPath = `/battle/${battleId}/submissions`;
      const submissionsRes = await axios.get(submissionsPath);

      if (shouldUpdate) {
        setSubmitted(
          submissionsRes.data
            .map((submission) => submission.author)
            .includes(loggedInUser._id)
        );
      }
    };
    try {
      getSubmissions();
    } catch (err) {
      console.error(err.data);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [battleId, loggedInUser._id]);

  /* useEffect for retrieving the image.  */
  useEffect(() => {
    let shouldUpdate = true;
    const setImage = async () => {
      const newImageUrl = await getImageUrl(filename);
      if (shouldUpdate) {
        setImageUrl(newImageUrl);
      }
    };
    setImage();
    return () => {
      shouldUpdate = false;
    };
  }, [filename]);

  return (
    <Card variant='outlined'>
      <CardActionArea
        component='div'
        onClick={() => {
          if (
            location.pathname === '/' ||
            location.pathname.startsWith('/users')
          ) {
            console.log('Open post');
            navigate(`/battles/${battleId}`);
          }
        }}
        onMouseDown={(event) => {
          if (location.pathname !== '/') {
            event.stopPropagation();
          }
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6">Battle of the Day</Typography>
          }
        />
        <CardContent sx={{ mt: -3 }}>
          <Typography variant="h6">{caption}</Typography>
        </CardContent>
        <CardMedia
          component='img'
          image={imageUrl}
          loading='lazy'
        />
        <CardActions disableSpacing>
          <Tooltip
            title={
              submitted
                ? 'Only one submission is allowed.'
                : !loggedInUser._id && 'Log in to submit to this battle.'
            }
          >
            <Box
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
              sx={{ width: '100%' }}
            >
              <Button
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  console.log('Open submit page');
                  navigate(`/battles/${battleId}/submit`);
                }}
                variant='contained'
                disabled={
                  submitted ||
                  !loggedInUser._id ||
                  location.pathname.endsWith('submit')
                }
                fullWidth
              >
                Enter
              </Button>
            </Box>
          </Tooltip>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

DailyBattleCard.propTypes = {
  battleId: PropTypes.string,
};

export { DailyBattleCard };
