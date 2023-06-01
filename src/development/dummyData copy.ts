import { VoteFrontend } from "../definitions/classes/vote";

function dummyDataFunc() {
  const vote1 = {
    _id: '645a1ed6d7064bcc4d28ae00',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: battle1._id,
    author: user2._id,
    votedModel: 'Battle',
  };

  const vote2 = {
    _id: '645a1ed6d7064bcc4d28ae01',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: comment2._id,
    author: user2._id,
    votedModel: 'Comment',
  };

  const vote3 = {
    _id: '645a1ed6d7064bcc4d28ae02',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: comment3._id,
    author: user1._id,
    votedModel: 'Comment',
  };

  const vote4 = {
    _id: '645a1ed6d7064bcc4d28ae03',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission1._id,
    author: user2._id,
    votedModel: 'Submission',
  };

  const vote5 = {
    _id: '645a1ed6d7064bcc4d28ae04',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission2._id,
    author: user3._id,
    votedModel: 'Submission',
  };
  const vote6 = {
    _id: '645a1ed6d7064bcc4d28ae05',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission2._id,
    author: user4._id,
    votedModel: 'Submission',
  };
  const vote7 = {
    _id: '645a1ed6d7064bcc4d28ae06',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission6._id,
    author: user5._id,
    votedModel: 'Submission',
  };
  const vote8 = {
    _id: '645a1ed6d7064bcc4d28ae07',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission14._id,
    author: user1._id,
    votedModel: 'Submission',
  };
  const vote9 = {
    _id: '645a1ed6d7064bcc4d28ae08',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission8._id,
    author: user1._id,
    votedModel: 'Submission',
  };
  const vote10 = {
    _id: '645a1ed6d7064bcc4d28ae09',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission11._id,
    author: user1._id,
    votedModel: 'Submission',
  };
  const vote11 = {
    _id: '645a1ed6d7064bcc4d28ae10',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission11._id,
    author: user3._id,
    votedModel: 'Submission',
  };
  const vote12 = {
    _id: '645a1ed6d7064bcc4d28ae11',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission13._id,
    author: user1._id,
    votedModel: 'Submission',
  };

  const fakeVotes: VoteFrontend[] = [
    vote1,
    vote2,
    vote3,
    vote4,
    vote5,
    vote6,
    vote7,
    vote8,
    vote9,
    vote10,
    vote11,
    vote12,
  ];

  const battles = () => {
    return fakeBattles;
  };

  const comments = () => {
    return fakeComments;
  };

  const submissions = () => {
    return fakeSubmissions;
  };

  const users = () => {
    return fakeUsers;
  };

  const votes = () => {
    return fakeVotes;
  };

  const dummyData = {
    battles: battles,
    comments: comments,
    submissions: submissions,
    users: users,
    votes: votes,
  };

  return dummyData;
}

export { dummyDataFunc };
