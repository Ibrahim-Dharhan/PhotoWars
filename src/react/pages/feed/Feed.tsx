import React from 'react';
import { BattleCard } from '../../components/battleCard/BattleCard';
import Grid from '@mui/material/Grid';
import {
  Outlet
} from 'react-router-dom';

const Feed = () => {
  return (
    <Grid>
      <BattleCard battleId={'64544bf83f9238e774994e00'} />
    </Grid>
  );
};

export { Feed };

