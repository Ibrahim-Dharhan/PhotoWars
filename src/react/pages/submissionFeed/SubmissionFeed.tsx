import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useLoaderData } from 'react-router-dom';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';

const submissionFeedLoader = async({ params }) => {
  const id = params.id;
  const path = `/battle/${id}/submissions`;
  const res = await axios.get(path);
  return res.data;
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
  gridTemplateColumns: { md: '1fr 1fr' },
  gap: 2,
};

const SubmissionFeed = () => {
  const submissions = useLoaderData() as Submission[];
  console.log(submissions);
  
  return (
    <React.Fragment>
      <Box sx={feedStyle}>
        {submissions.map((submission) => {
          return <SubmissionCard submissionId={submission._id} key={submission._id}/>
        })}
      </Box>
    </React.Fragment>
  );
};

export { SubmissionFeed, submissionFeedLoader};
