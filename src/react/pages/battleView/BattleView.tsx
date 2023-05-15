import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
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
