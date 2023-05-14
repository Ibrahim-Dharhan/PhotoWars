import React from 'react';
import axios from 'axios';
import { BattleCard } from '../../components/battleCard/BattleCard';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
import { useParams, useLoaderData } from 'react-router-dom';

const battleViewLoader = async({ params }) => {
  const id = params.id;
  const path = `/battle/${id}/submissions`;
  const res = await axios.get(path);
  return res.data;
}

const BattleView = () => {
  const { id } = useParams();
  const submissions = useLoaderData();
  
  return (
    <React.Fragment>
      <BattleCard battleId={id} />
      {submissions.map((submission) => {
        return (<SubmissionCard submissionId={submission._id} key={submission._id}/>);
      })}
    </React.Fragment>
  );
};

export { BattleView, battleViewLoader };
