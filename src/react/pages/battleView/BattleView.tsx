import React, { useState } from 'react';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { Outlet, useParams } from 'react-router-dom';

const BattleView = () => {
  const [numBVSubmissions, setNumBVSubmissions] = useState(0);
  const { id } = useParams();
  
  return (
    <React.Fragment>
      <BattleCard
        battleId={id}
        numBVSubmissions={numBVSubmissions}
        setNumBVSubmissions={setNumBVSubmissions}
      />
      <Outlet context={[numBVSubmissions, setNumBVSubmissions]}/>
    </React.Fragment>
  );
};

export { BattleView };
