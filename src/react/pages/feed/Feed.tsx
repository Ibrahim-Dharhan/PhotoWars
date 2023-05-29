import * as React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { ImageList } from '@mui/material';

const feedLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const path = '/battle/all';
  const res = await axios.get(path, {
    params: { open: url.searchParams.get('open') },
  });
  return res.data;
};

const Feed = () => {
  /* First element in battles is the battle of the day.  */
  const battles = useLoaderData() as { _id: string}[];
  const battlesRecent = battles.slice(1).reverse();

  /* Move battle of the day to the front of the array.  */
  if (battles[0]) battlesRecent.unshift(battles[0]);

  return (
    <React.Fragment>
      <ImageList variant="masonry" cols={3} gap={24}>
         {battlesRecent.map((battle, i) => {
            return (
              <BattleCard
                battleId={battle._id}
                isPhotoOfTheDay={i === 0}
                key={battle._id}
              />
            );
          })}
      </ImageList>
    </React.Fragment>
  );
};

export { Feed, feedLoader };
