"use strict";

import mongoose = require('mongoose');
import dotenv = require('dotenv');
import path = require('path');
dotenv.config();
import { uploadFileToS3 } from '../definitions/s3';
import * as constants from '../definitions/constants';

const MONGODB_URI = process.env['MONGODB_URI']
                    || 'mongodb://127.0.0.1:27017/'
                       + constants._mongoDatabaseName;
const IMAGE_DIR = process.env['IMAGE_DIR'] || constants._imageDir;
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
      await Battle.create(battle);
      if (process.env['IMAGE_DIR']) {
        await uploadFileToS3({
          path: path.join(IMAGE_DIR, battle.filename),
          filename: battle.filename
        });
        console.log(`Uploaded file ${battle.filename} to Amazon S3.`);
      }
      console.log(`Added battle "${battle.caption}" to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating comments.');
  const commentModels = dummyData.comments();
  try {
    await Promise.all(commentModels.map(async (comment) => {
      await Comment.create(comment);
      console.log(`Added comment "${comment.text}" to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating submissions.');
  const submissionModels = dummyData.submissions();
  try {
    await Promise.all(submissionModels.map(async (submission) => {
      await Submission.create(submission);
      if (process.env['IMAGE_DIR']) {
        await uploadFileToS3({
          path: path.join(IMAGE_DIR, submission.filename),
          filename: submission.filename
        });
        console.log(`Uploaded file ${submission.filename} to Amazon S3.`);
      }
      console.log(`Added submission "${submission.caption}" to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating users.');
  const userModels = dummyData.users();
  try {
    await Promise.all(userModels.map(async (user) => {
      await User.create(user);
      if (process.env['IMAGE_DIR']) {
        await uploadFileToS3({
          path: path.join(IMAGE_DIR, user.filename),
          filename: user.filename
        });
        console.log(`Uploaded file ${user.filename} to Amazon S3.`);
      }
      console.log(`Added user ${user.firstName} ${user.lastName} to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  console.log('Populating votes.');
  const voteModels = dummyData.votes();
  try {
    await Promise.all(voteModels.map(async (vote) => {
      await Vote.create(vote);
      console.log(`Added vote to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  mongoose.disconnect();
})();
