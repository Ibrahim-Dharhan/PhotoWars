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
    const setBattleIds = async() => {
      const path = '/battle/ids';
      const res = await axios.get(path);
      const battleIdsList = res.data;

      if (shouldUpdate) {
        // setBattleIds(battleIdsList);
        // setBattleIds(['64544bf83f9238e774994e00']);
        console.log(battleIdsList);
      }
    };
    try {
      setBattleIds();
    } catch (err) {
      console.error(err.data);
    }
    return () => { shouldUpdate = false; };
  }, [])

  return (
    battleIds.length === 0 ?
      <div />
    :
      <>
        {battleIds.map((battleId) => <BattleCard battleId={battleId} /> )}
      </>
  );
};

export { Feed };

