import React from 'react';
import axios from 'axios';
import { SubmissionCard } from '../../components/submissionCard/SubmissionCard';
import { useLoaderData } from 'react-router-dom';

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

const SubmissionFeed = () => {
  const submissions = useLoaderData() as Submission[];
  console.log(submissions);
  
  return (
    <React.Fragment>
      {submissions.map((submission) => {
        return (<SubmissionCard submissionId={submission._id} key={submission._id}/>);
      })}
    </React.Fragment>
  );
};

export { SubmissionFeed, submissionFeedLoader};
