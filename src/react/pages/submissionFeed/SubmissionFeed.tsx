import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLoaderData } from 'react-router-dom';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
import { SubmissionModal } from '../../components/submissionModal/submissionModal';

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Box sx={feedStyle}>
        {submissions.map((submission) => {
          return <SubmissionCard submissionId={submission._id} key={submission._id}/>
        })}
      </Box>
      <SubmissionModal 
        open={open}
        handleClose={handleClose}
        submissionId={submissions[0]._id}
        displayName={'User'}
        caption={submissions[0].caption}
        filename={submissions[0].filename}
      />
    </React.Fragment>
  );
};

export { SubmissionFeed, submissionFeedLoader};
