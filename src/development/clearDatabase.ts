"use strict";

import mongoose = require('mongoose');

const MONGODB_NAME = 'cs194';
mongoose.connect('mongodb://127.0.0.1:27017/' + MONGODB_NAME);

/* Mongoose schemas.  */
import { Battle } from '../schemas/battle';
import { Comment } from '../schemas/comment';
import { Submission } from '../schemas/submission';
import { User } from '../schemas/user';

/* Remove all existing data in the collections.  */
const removePromises = [
  Battle.deleteMany({}),
  Comment.deleteMany({}),
  Submission.deleteMany({}),
  User.deleteMany({})
];

Promise.all(removePromises).then(() => {
  /* All existing data has been removed.  */
  console.log(`Removed all data in ${MONGODB_NAME} database.`);
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error removing data.', err);
});
