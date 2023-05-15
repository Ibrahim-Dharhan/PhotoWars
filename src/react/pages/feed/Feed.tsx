import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import {
  useLoaderData
} from 'react-router-dom';

const feedLoader = async () => {
  const path = '/battle/all';
  const res = await axios.get(path);
  return res.data;
}

const Feed = () => {
  const battleIds = useLoaderData() as string[];

  return (
    <React.Fragment>
      {battleIds.map((battleId) => {
        return (<BattleCard battleId={battleId} key={battleId}/>);
      })}
    </React.Fragment>
  );
};

export { Feed, feedLoader };

