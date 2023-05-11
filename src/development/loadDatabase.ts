"use strict";

import mongoose = require('mongoose');

import * as constants from '../definitions/constants';

const MONGODB_URI = process.env.MONGODB_URL
                    || 'mongodb://127.0.0.1:27017/'
                       + constants._mongoDatabaseName;
mongoose.connect(MONGODB_URI);

/* Mongoose schemas.  */
import { Battle } from '../definitions/schemas/mongoose/battle';
import { Comment } from '../definitions/schemas/mongoose/comment';
import { Submission } from '../definitions/schemas/mongoose/submission';
import { User } from '../definitions/schemas/mongoose/user';
import { Vote } from '../definitions/schemas/mongoose/vote';

/* Dummy data.  */
import { dummyDataFunc } from './dummyData';
const dummyData = dummyDataFunc();

(async () => {
  /* Remove all existing data in the collections.  */
  const removePromises = [
    Battle.deleteMany({}),
    Comment.deleteMany({}),
    Submission.deleteMany({}),
    User.deleteMany({}),
    Vote.deleteMany({})
  ];
  try {
    await Promise.all(removePromises);
    console.log(`Removed all data in ${constants._mongoDatabaseName} database.`);
  } catch (err) {
    console.error(err);
  }

  console.log('Populating battles.');
  const battleModels = dummyData.battles();
  try {
    await Promise.all(battleModels.map(async (battle) => {
      const battleObj = await Battle.create(battle);
      await battleObj.save();
      console.log(`Added battle "${battle.caption}" to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating comments.');
  const commentModels = dummyData.comments();
  try {
    await Promise.all(commentModels.map(async (comment) => {
      const commentObj = await Comment.create(comment);
      await commentObj.save();
      console.log(`Added comment "${comment.text}" to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating submissions.');
  const submissionModels = dummyData.submissions();
  try {
    await Promise.all(submissionModels.map(async (submission) => {
      const submissionObj = await Submission.create(submission);
      await submissionObj.save();
      console.log(`Added submission "${submission.caption}" to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating users.');
  const userModels = dummyData.users();
  try {
    await Promise.all(userModels.map(async (user) => {
      const userObj = await User.create(user);
      await userObj.save();
      console.log(`Added user ${user.firstName} ${user.lastName} to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating votes.');
  const voteModels = dummyData.votes();
  try {
    await Promise.all(voteModels.map(async (vote) => {
      const voteObj = await Vote.create(vote);
      await voteObj.save();
      console.log(`Added vote to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  mongoose.disconnect();
})();
