import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import {
  useLoaderData
} from 'react-router-dom';
import Stack from '@mui/material/Stack';

const feedLoader = async () => {
  const path = '/battle/all';
  const res = await axios.get(path);
  return res.data;
}

const Feed = () => {
  const battleIds = useLoaderData() as string[];
  const battleIdsRecent = battleIds.slice(0).reverse();

  return (
    <React.Fragment>
<<<<<<< HEAD
      <Stack spacing={1}>
        {battleIdsRecent.map((battleId) => {
          return (<BattleCard battleId={battleId} key={battleId} />);
        })}
      </Stack>
=======
      {battleIdsRecent.map((battleId) => {
        return (<BattleCard battleId={battleId} key={battleId}/>);
      })}
>>>>>>> main
    </React.Fragment>
  );
};

export { Feed, feedLoader };

