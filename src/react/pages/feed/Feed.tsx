import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import {
  useLoaderData
} from 'react-router-dom';
import {
  Stack,
  ImageList,
} from '@mui/material';


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
      <ImageList variant="masonry" cols={3} gap={24}>
        {battleIdsRecent.map((battleId) => {
          return (<BattleCard battleId={battleId} key={battleId} showModal={null} />);
        })}
      </ImageList>
    </React.Fragment>
  );
};

export { Feed, feedLoader };

