import React, { MouseEvent } from 'react';
import { PhotoCard } from '../PhotoCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/battle');
  };
  return (
    <Grid>
      <PhotoCard onClick={handleClick} />
    </Grid>
  );
};

export { Feed };
