import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import Grid from '@mui/material/Grid';
import {
  Outlet
} from 'react-router-dom';

const Feed = () => {
  const [battleIds, setBattleIds] = useState([]);

  useEffect(() => {
    let shouldUpdate = true;
    const getBattleIds = async () => {
      const path = '/battle/ids';
      const res = await axios.get(path);
      const battleIdsData = res.data;
      if (shouldUpdate) {
        setBattleIds(battleIdsData);
      }
    }
    try {
      getBattleIds();
    } catch (err) {
      console.error(err);
    }
    return () => { shouldUpdate = false; };
  }, [battleIds]);

  return (
    <>
      {battleIds.map((battleId) => <BattleCard battleId={battleId} key={battleId}/> )}
    </>
  );
};

export { Feed };

