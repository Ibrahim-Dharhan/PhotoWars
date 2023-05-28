import React from 'react';
import axios from 'axios';
import {
  Stack
} from '@mui/material';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { Outlet, redirect, useParams } from 'react-router-dom';

const battleViewLoader = async ({ params }) => {
  const battleId = params.battleId;
  const path = `/battle/${battleId}`;
  try {
    await axios.get(path);
  } catch (err) {
    if (err.response.status === 404) {
      return redirect('/404');
    }
  }
  return null;
}

const BattleView = () => {
  const { battleId } = useParams();

  return (
    <Stack
      alignItems="center"
      sx={{
        width: "100%"
      }}
    >
      <BattleCard
        battleId={battleId}
      />
      <Outlet />
    </Stack>
  );
};

export { BattleView, battleViewLoader };