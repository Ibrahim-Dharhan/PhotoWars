import React from 'react';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { Outlet, useParams } from 'react-router-dom';

const BattleView = () => {
  const { id } = useParams();
  
  return (
    <React.Fragment>
      <BattleCard battleId={id} />
      <Outlet />
    </React.Fragment>
  );
};

export { BattleView };
