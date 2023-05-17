import React from 'react';
import axios from 'axios';
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
  const submissionIds = useLoaderData() as string[];
  
  return (
    <React.Fragment>
      {submissionIds.map((submissionId) => {
        return (<SubmissionCard submissionId={submissionId} key={submissionId}/>);
      })}
    </React.Fragment>
  );
};

export { SubmissionFeed, submissionFeedLoader};
