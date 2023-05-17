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

  const user3 = {
    _id: '645449c2d0215be49c7e1302',
    description: 'Desc',
    displayName: 'cd',
    filename: 'seagull.jpg',
    firstName: 'c',
    lastName: 'd',
    loginName: 'cd ',
    loginPassword: 'cd',
  };

  const user4 = {
    _id: '645449c2d0215be49c7e1303',
    description: 'Desc',
    displayName: 'de',
    filename: 'seagull.jpg',
    firstName: 'd',
    lastName: 'e',
    loginName: 'de',
    loginPassword: 'de',
  };

  const user5 = {
    _id: '645449c2d0215be49c7e1304',
    description: 'Desc',
    displayName: 'ef',
    filename: 'seagull.jpg',
    firstName: 'e',
    lastName: 'f',
    loginName: 'ef',
    loginPassword: 'ef',
  };

  const fakeUsers = [user1, user2, user3, user4, user5];

  /* Fake battles.  */
  const battle1 = {
    _id: '64544bf83f9238e774994e00',
    author: user1._id,
    caption: 'This cat with a skull on his chest',
    creationTime: '2023-05-05T00:24:14.710Z',
    deadline: '2023-05-27T00:26:13.696Z',
    filename: 'skullCatBattle.jpeg',
  };

  const battle2 = {
    _id: '64544bf83f9238e774994e01',
    author: user1._id,
    caption: 'This hedgehog posing in a tiny kayak',
    creationTime: '2023-05-05T00:24:14.710Z',
    deadline: '2023-05-28T00:26:13.696Z',
    filename: 'hedgehogBattle.jpg',
  };

  const battle3 = {
    _id: '64544bf83f9238e774994e02',
    author: user1._id,
    caption: 'Obama winning connect four against Stephen Curry',
    creationTime: '2023-05-05T00:24:14.710Z',
    deadline: '2023-05-30T00:26:13.696Z',
    filename: 'ObamaBattle.jpg',
  };

  const fakeBattles = [battle1, battle2, battle3];

  /* Fake submissions.  */
  const submission1 = {
    _id: '64544e66d74751fa1b70b200',
    author: user1._id,
    battle: battle1._id,
    caption: 'The Dark Mark',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'skullCatSubmission1.jpeg',
    numVotes: 6354,
  };

  const submission2 = {
    _id: '64544e66d74751fa1b70b201',
    author: user2._id,
    battle: battle1._id,
    caption: 'Old Skull Pirate Holding Skull',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'skullCatSubmission2.jpeg',
    numVotes: 2230,
  };

  const submission3 = {
    _id: '64544e66d74751fa1b70b202',
    author: user3._id,
    battle: battle1._id,
    caption: 'Hamlet holding a skull',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'skullCatSubmission3.jpeg',
    numVotes: 247,
  };

  const submission4 = {
    _id: '64544e66d74751fa1b70b203',
    author: user4._id,
    battle: battle1._id,
    caption: 'Coming soon on Catflix',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'skullCatSubmission4.jpeg',
    numVotes: 4417,
  };

  const submission5 = {
    _id: '64544e66d74751fa1b70b204',
    author: user5._id,
    battle: battle1._id,
    caption: 'Get your motor running',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'skullCatSubmission5.jpeg',
    numVotes: 3295,
  };

  const submission6 = {
    _id: '64544e66d74751fa1b70b205',
    author: user1._id,
    battle: battle2._id,
    caption: "Titanic 2: There's Room For Everyone!",
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'hedgehogSubmission1.jpg',
    numVotes: 6354,
  };

  const submission7 = {
    _id: '64544e66d74751fa1b70b206',
    author: user2._id,
    battle: battle2._id,
    caption: 'Flock to me, my sea brethren!!',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'hedgehogSubmission2.jpg',
    numVotes: 2230,
  };

  const submission8 = {
    _id: '64544e66d74751fa1b70b207',
    author: user3._id,
    battle: battle2._id,
    caption: "He's just happy to be participating",
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'hedgehogSubmission3.jpg',
    numVotes: 247,
  };

  const submission9 = {
    _id: '64544e66d74751fa1b70b208',
    author: user4._id,
    battle: battle2._id,
    caption: "Let's ride this",
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'hedgehogSubmission4.jpg',
    numVotes: 4417,
  };

  const submission10 = {
    _id: '64544e66d74751fa1b70b209',
    author: user5._id,
    battle: battle2._id,
    caption: 'Canoe & Kayak Magazine',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'hedgehogSubmission5.jpg',
    numVotes: 3295,
  };

  const submission11 = {
    _id: '64544e66d74751fa1b70b210',
    author: user1._id,
    battle: battle3._id,
    caption: 'Pucker Up, Steph',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'ObamaSubmission1.jpg',
    numVotes: 6354,
  };

  const submission12 = {
    _id: '64544e66d74751fa1b70b211',
    author: user2._id,
    battle: battle3._id,
    caption: 'bros pumping it at the white house',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'ObamaSubmission2.jpg',
    numVotes: 2230,
  };

  const submission13 = {
    _id: '64544e66d74751fa1b70b212',
    author: user3._id,
    battle: battle3._id,
    caption: "Curry doesn't like heights...",
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'ObamaSubmission3.jpg',
    numVotes: 247,
  };

  const submission14 = {
    _id: '64544e66d74751fa1b70b213',
    author: user4._id,
    battle: battle3._id,
    caption: 'NeverEnding Victory Lap',
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'ObamaSubmission4.jpg',
    numVotes: 4417,
  };

  const submission15 = {
    _id: '64544e66d74751fa1b70b214',
    author: user5._id,
    battle: battle3._id,
    caption: "The President's Gambit",
    creationTime: '2023-05-05T00:32:09.969Z',
    filename: 'ObamaSubmission5.jpg',
    numVotes: 3295,
  };

  const fakeSubmissions = [
    submission1,
    submission2,
    submission3,
    submission4,
    submission5,
    submission6,
    submission7,
    submission8,
    submission9,
    submission10,
    submission11,
    submission12,
    submission13,
    submission14,
    submission15,
  ];

  /* Fake comments.  */
  const comment1 = {
    _id: '64544dd0803990cdf005ca00',
    author: user2._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission1._id,
    text: 'This one is my favorite lol so good!',
  };

  const comment2 = {
    _id: '64544dd0803990cdf005ca01',
    author: user3._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission1._id,
    text: 'This is legit my favourite entry in this sub yet',
  };

  const comment3 = {
    _id: '64544dd0803990cdf005ca02',
    author: user4._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission2._id,
    text: 'Now you need to make one of Hamlet',
  };

  const comment4 = {
    _id: '64544dd0803990cdf005ca03',
    author: user5._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission2._id,
    text: 'The Pirates of the Catribbean: The pussy is scared',
  };

  const comment5 = {
    _id: '64544dd0803990cdf005ca04',
    author: user5._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission6._id,
    text: 'This made my day. Cheers',
  };

  const comment6 = {
    _id: '64544dd0803990cdf005ca05',
    author: user1._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission6._id,
    text: 'Omg I dont know if to upvote or downvote this... Titanic is my favorite movie but I hate the whole "is there enough room" argument...',
  };

  const comment7 = {
    _id: '64544dd0803990cdf005ca06',
    author: user3._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission8._id,
    text: 'Talk about living up to the family name.',
  };

  const comment8 = {
    _id: '64544dd0803990cdf005ca07',
    author: user4._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission8._id,
    text: 'This is my favorite one',
  };

  const comment9 = {
    _id: '64544dd0803990cdf005ca08',
    author: user5._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission11._id,
    text: 'A minor edit, but a well appreciated one',
  };

  const comment10 = {
    _id: '64544dd0803990cdf005ca09',
    author: user1._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission11._id,
    text: 'Spin the damn bottle.',
  };

  const comment11 = {
    _id: '64544dd0803990cdf005ca10',
    author: user3._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission12._id,
    text: 'Obama looking disturbingly relaxed there.',
  };

  const comment12 = {
    _id: '64544dd0803990cdf005ca11',
    author: user4._id,
    commentedModel: 'Submission',
    creationTime: '2023-05-05T00:29:04.296Z',
    post: submission12._id,
    text: 'This one works REALLY well. lmao',
  };
  const fakeComments = [
    comment1,
    comment2,
    comment3,
    comment4,
    comment5,
    comment6,
    comment7,
    comment8,
    comment9,
    comment10,
    comment11,
    comment12,
  ];

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
    post: comment3._id,
    user: user1._id,
    votedModel: 'Comment',
  };

  const vote4 = {
    _id: '645a1ed6d7064bcc4d28ae03',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission1._id,
    user: user2._id,
    votedModel: 'Submission',
  };

  const vote5 = {
    _id: '645a1ed6d7064bcc4d28ae04',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission2._id,
    user: user3._id,
    votedModel: 'Submission',
  };
  const vote6 = {
    _id: '645a1ed6d7064bcc4d28ae05',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission2._id,
    user: user4._id,
    votedModel: 'Submission',
  };
  const vote7 = {
    _id: '645a1ed6d7064bcc4d28ae06',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission6._id,
    user: user5._id,
    votedModel: 'Submission',
  };
  const vote8 = {
    _id: '645a1ed6d7064bcc4d28ae07',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission14._id,
    user: user1._id,
    votedModel: 'Submission',
  };
  const vote9 = {
    _id: '645a1ed6d7064bcc4d28ae08',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission8._id,
    user: user1._id,
    votedModel: 'Submission',
  };
  const vote10 = {
    _id: '645a1ed6d7064bcc4d28ae09',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission11._id,
    user: user1._id,
    votedModel: 'Submission',
  };
  const vote11 = {
    _id: '645a1ed6d7064bcc4d28ae10',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission11._id,
    user: user3._id,
    votedModel: 'Submission',
  };
  const vote12 = {
    _id: '645a1ed6d7064bcc4d28ae11',
    creationTime: '2023-05-09T10:22:14.220Z',
    post: submission13._id,
    user: user1._id,
    votedModel: 'Submission',
  };

  const fakeVotes = [
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
