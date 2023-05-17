import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
import { useParams, useLoaderData } from 'react-router-dom';

const submissionFeedLoader = async({ params }) => {
  const id = params.id;
  const path = `/battle/${id}/submissions`;
  const res = await axios.get(path);
  return res.data;
}

const SubmissionFeed = () => {
  const { id } = useParams();
  const submissions = useLoaderData();
  
  return (
    <React.Fragment>
      <Box
              sx={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 0,
                paddingRight:0,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
      {submissions.map((submission) => {
        return <SubmissionCard submissionId={submission._id} key={submission._id}/>
      })}
      </Box>
    </React.Fragment>
  );
};

export { SubmissionFeed, submissionFeedLoader};
