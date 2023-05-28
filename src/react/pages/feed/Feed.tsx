import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { useLoaderData } from 'react-router-dom';
import { ImageList } from '@mui/material';

const feedLoader = async ({ request }) => {
  const url = new URL(request.url);
  const path = '/battle/all';
  const res = await axios.get(path, {
    params: { openCompetitionsOnly: url.searchParams.get('opencompetitions') },
  });
  return res.data;
};

const Feed = () => {
  const battleIds = useLoaderData() as string[];
  const battleIdsRecent = battleIds.slice(0).reverse();

  return (
    <React.Fragment>
      <ImageList variant="masonry" cols={3} gap={24}>
         {battleIdsRecent.map((battleId) => {
            return (
              <BattleCard
                battleId={battleId}
                key={battleId}
              />
            );
          })}
      </ImageList>
    </React.Fragment>
  );
};

export { Feed, feedLoader };
