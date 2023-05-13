import React from 'react';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { useParams } from 'react-router-dom';

const Battle = () => {
  const { id } = useParams();
  
  return (
    <>
      <BattleCard battleId={id} />
    </>
  );
};

export { Battle };
