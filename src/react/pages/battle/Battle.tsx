import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { useLoaderData, useParams } from 'react-router-dom';

const Battle = () => {
  const { id } = useParams();
  const data = useLoaderData();
  
  return (
    <>
      <BattleCard battleId={id} />
    </>
  );
};

export { Battle };
