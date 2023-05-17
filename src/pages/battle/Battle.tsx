import React, { useState } from 'react';
import { PhotoCard } from '../../components/PhotoCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

const Battle = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/battle");
  };
  return (
    <Grid>
      <PhotoCard />
    </Grid>
  );
};

export { Battle };
