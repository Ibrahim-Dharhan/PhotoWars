import React, { useState } from 'react';
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

type VariantContext = {
  variant: string | null,
  setVariant: React.Dispatch<React.SetStateAction<string>> | null
};

const BattleView = () => {
  const { battleId } = useParams();
  const [variant, setVariant] = useState('');

  return (
    <Stack
      alignItems="center"
      sx={{
        width: "100%"
      }}
    >
      <BattleCard
        battleId={battleId}
        setVariant={setVariant}
      />
      <Outlet context={{ variant, setVariant }}/>
    </Stack>
  );
};

export { BattleView, battleViewLoader, VariantContext };
