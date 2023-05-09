function dummyDataFunc() {
  /* Fake users.  */
  const user1 = { _id: '645449c2d0215be49c7e1300', description: 'Desc',
               filename: 'seagull.jpg', firstName: 'a', lastName: 'b',
               loginName: 'ab', loginPassword: 'ab' };

  const user2 = { _id: '645449c2d0215be49c7e1301', description: 'Desc',
               filename: 'seagull.jpg', firstName: 'b', lastName: 'c',
               loginName: 'bc', loginPassword: 'bc' };

  const fakeUsers = [user1, user2];

  /* Fake battles.  */
  const battle1 = { _id: '64544bf83f9238e774994e00',
                    authorId: user1._id, caption: 'battle1',
                    creationTime: '2023-05-05T00:24:14.710Z',
                    deadline: '2023-05-05T00:26:13.696Z',
                    fileName: 'seagull.jpg', numLikes: 1 }

  const fakeBattles = [battle1];

  /* Fake submissions.  */
  const submission1 = { _id: '64544e66d74751fa1b70b200',
                        authorId: user2._id,
                        battleId: battle1._id,
                        caption: 'submission1',
                        creationTime: '2023-05-05T00:32:09.969Z',
                        filename: 'seagull.jpg', numVotes: 1 };

  const fakeSubmissions = [submission1];

  /* Fake comments.  */
  const comment1 = { _id: '64544dd0803990cdf005ca00',
                     authorId: user1._id, commentedModel: 'Battle',
                     creationTime: '2023-05-05T00:29:04.296Z', numLikes: 1,
                     postId: battle1._id, text: 'comment1' };

  const comment2 = { _id: '64544dd0803990cdf005ca01',
                     authorId: user1._id, commentedModel: 'Submission',
                     creationTime: '2023-05-05T00:29:04.296Z', numLikes: 1,
                     postId: submission1._id, text: 'comment1' };

  const fakeComments = [comment1, comment2];


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

  const dummyData = {
    battles: battles,
    comments: comments,
    submissions: submissions,
    users: users
  };

  return dummyData;

}

export { dummyDataFunc };
