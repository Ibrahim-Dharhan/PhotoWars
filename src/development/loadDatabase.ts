"use strict";

import mongoose from 'mongoose';

const MONGODB_NAME = 'cs194';
mongoose.connect('mongodb://127.0.0.1:27017/' + MONGODB_NAME);

/* Mongoose schemas.  */
import { Battle } from '../schemas/battle';
import { Comment } from '../schemas/comment';
import { Submission } from '../schemas/submission';
import { User } from '../schemas/user';

/* Dummy data.  */
import { dummyDataFunc } from './dummyData';
const dummyData = dummyDataFunc();

(async () => {
  /* Remove all existing data in the collections.  */
  const removePromises = [
    Battle.deleteMany({}),
    Comment.deleteMany({}),
    Submission.deleteMany({}),
    User.deleteMany({})
  ];
  try {
    await Promise.all(removePromises);
    console.log(`Removed all data in ${MONGODB_NAME} database.`);
  } catch (err) {
    console.error(err);
  }

  console.log('Populating users.');
  const userModels = dummyData.users();
  try {
    await Promise.all(userModels.map(async (user) => {
      const userObj = await User.create(user);
      await userObj.save();
      console.log(`Added user ${user.first_name} ${user.last_name} to database.`);
    }));
  } catch (err) {
    console.error(err);
  }

  mongoose.disconnect();
})();
