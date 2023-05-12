import React from 'react';
import axios from 'axios';
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
