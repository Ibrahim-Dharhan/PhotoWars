import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { useLoaderData } from 'react-router-dom';
import Stack from '@mui/material/Stack';

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
      <Stack alignItems='center' spacing={1}>
        <Stack sx={{ maxWidth: '60%' }}>
          {battleIdsRecent.map((battleId) => {
            return (
              <BattleCard
                battleId={battleId}
                key={battleId}
                showModal={null}
              />
            );
          })}
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export { Feed, feedLoader };
