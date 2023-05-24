import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useLoaderData } from 'react-router-dom';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
import { inherits } from 'util';
import { useShowModal } from '../battleView/BattleView';

const submissionFeedLoader = async({ params }) => {
  const id = params.id;
  const path = `/battle/${id}/submissions`;
  const res = await axios.get(path);
  return res.data;
  console.log("Loading submission data");
}

interface Submission {
  _id: string;
  __v: number;
  author: string;
  caption: string;
  creationTime: string;
  filename: string;
}

const feedStyle = {
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 0,
  paddingRight:0,
  bgcolor: 'background.default',
  display: 'grid',
  gridTemplateColumns: { md: 'minmax(0,1fr) minmax(0,1fr)' },
  gap: 2,
};

const SubmissionFeed = () => {
  const { showModal } = useShowModal();
  const submissions = useLoaderData() as Submission[];
  // console.log(submissions);
  
  return (
    <React.Fragment>
      <Grid sx={feedStyle}>
        {submissions.map((submission) => {
          return <SubmissionCard submissionId={submission._id} key={submission._id} showModal={showModal}/>
        })}
      </Grid>
    </React.Fragment>
  );
};

export { SubmissionFeed, submissionFeedLoader};
