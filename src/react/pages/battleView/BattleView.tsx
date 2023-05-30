import * as React from 'react';
import axios, { isAxiosError } from 'axios';
import {
  Stack
} from '@mui/material';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { LoaderFunction, Outlet, redirect, useParams } from 'react-router-dom';

const battleViewLoader: LoaderFunction = async ({ params }) => {
  const battleId = params['battleId'];
  const path = `/battle/${battleId}`;
  try {
    await axios.get<{ _id: string }[]>(path);
  } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          return redirect('/404');
        }
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
  }
  return null;
}

interface IParams {
  battleId: string
}

const BattleView = () => {
  const { battleId } = useParams<'battleId'>() as IParams;

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