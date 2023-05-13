function dummyDataFunc() {
  /* Fake users.  */
  const user1 = {
    _id: '645449c2d0215be49c7e1300',
    description: 'Desc',
    displayName: 'ab',
    filename: 'seagull.jpg',
    firstName: 'a',
    lastName: 'b',
    loginName: 'ab',
    loginPassword: 'ab',
  };

  const user2 = {
    _id: '645449c2d0215be49c7e1301',
    description: 'Desc',
    displayName: 'bc',
    filename: 'seagull.jpg',
    firstName: 'b',
    lastName: 'c',
    loginName: 'bc',
    loginPassword: 'bc',
  };

  const fakeUsers = [user1, user2];

  /* Fake battles.  */
  const battle1 = {
    _id: '64544bf83f9238e774994e00',
    author: user1._id,
    caption: 'battle1',
    creationTime: '2023-05-05T00:24:14.710Z',
    deadline: '2023-05-05T00:26:13.696Z',
    filename: 'cat.jpeg',
  };

  const battle2 = {
    _id: '64544bf83f9238e774994e01',
    author: user2._id,
    caption: 'battle2',
    creationTime: '2023-05-05T00:24:14.710Z',
    deadline: '2023-05-05T00:26:13.696Z',
    filename: 'seagull.jpg',
  };

  const fakeBattles = [battle1, battle2];

  /* Fake submissions.  */
  const submission1 = {
    _id: '64544e66d74751fa1b70b200',
    author: user2._id,
    battle: battle1._id,
    caption: 'submission1',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'seagull.jpg',
    numVotes: 1,
  };

  const fakeSubmissions = [submission1];

  /* Fake comments.  */
  const comment1 = {
    _id: '64544dd0803990cdf005ca00',
    author: user2._id,
    commentedModel: 'Battle',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: battle1._id,
    text: 'comment1',
  };

  const comment2 = {
    _id: '64544dd0803990cdf005ca01',
    author: user1._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission1._id,
    text: 'comment2',
  };

  const fakeComments = [comment1, comment2];

  const vote1 = {
    _id: '645a1ed6d7064bcc4d28ae00',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: battle1._id,
    user: user2._id,
    votedModel: 'Battle',
  };

  const vote2 = {
    _id: '645a1ed6d7064bcc4d28ae01',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: comment2._id,
    user: user2._id,
    votedModel: 'Comment',
  };

  const vote3 = {
    _id: '645a1ed6d7064bcc4d28ae02',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: comment1._id,
    user: user1._id,
    votedModel: 'Comment',
  };

  const vote4 = {
    _id: '645a1ed6d7064bcc4d28ae03',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission1._id,
    user: user1._id,
    votedModel: 'Submission',
  };

  const fakeVotes = [vote1, vote2, vote3];

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
