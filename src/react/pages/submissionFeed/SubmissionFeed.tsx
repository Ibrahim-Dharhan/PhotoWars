import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';

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

interface BVSubmissionFeedState {
  showModal: (variant: string, id: string, author: string, caption: string, filename: string) => void
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
  const { showModal } = useOutletContext() as BVSubmissionFeedState;
  const submissions = useLoaderData() as Submission[];
  
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
