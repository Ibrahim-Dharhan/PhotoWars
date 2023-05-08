function dummyDataFunc() {
  /* Fake users.  */
  const user1 = { _id: '645449c2d0215be49c7e1320', description: 'Desc',
               file_name: 'seagull.jpg', first_name: 'a', last_name: 'b',
               login_name: 'ab', login_password: 'ab' };

  const user2 = { _id: '645449c2d0215be49c7e1321', description: 'Desc',
               file_name: 'seagull.jpg', first_name: 'c', last_name: 'c',
               login_name: 'bc', login_password: 'bc' };

  const fakeUsers = [user1, user2];

  /* Fake battles.  */
  const battle1 = { _id: '64544bf83f9238e774994089',
                    author_id: user1._id, caption: 'battle1',
                    creation_time: '2023-05-05T00:24:14.710Z',
                    deadline: '2023-05-05T00:26:13.696Z',
                    file_name: 'seagull.jpg', num_likes: 1,
                    num_submissions: 1 };

  const fakeBattles = [battle1];

  /* Fake comments.  */
  const comment1 = { _id: '64544dd0803990cdf005cae5',
                     author_id: user1._id,
                     creation_time: '2023-05-05T00:29:04.296Z', num_likes: 1,
                     text: 'comment1' };

  const fakeComments = [comment1];

  /* Fake submissions.  */
  const submission1 = { _id: '64544e66d74751fa1b70b200',
                        author_id: user2._id,
                        battle_id: battle1._id,
                        caption: 'submission1',
                        comment_ids: [comment1._id],
                        creation_time: '2023-05-05T00:32:09.969Z',
                        file_name: 'seagull.jpg',
                        num_votes: 1,
                        num_comments: 1 };

  const fakeSubmissions = [submission1];


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
