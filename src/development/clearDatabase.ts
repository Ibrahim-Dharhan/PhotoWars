"use strict";

import mongoose = require('mongoose');

import * as constants from '../definitions/constants';

mongoose.connect('mongodb://127.0.0.1:27017/' + constants._mongoDatabaseName);

/* Mongoose schemas.  */
import { Battle } from '../definitions/schemas/battle';
import { Comment } from '../definitions/schemas/comment';
import { Submission } from '../definitions/schemas/submission';
import { User } from '../definitions/schemas/user';

/* Remove all existing data in the collections.  */
const removePromises = [
  Battle.deleteMany({}),
  Comment.deleteMany({}),
  Submission.deleteMany({}),
  User.deleteMany({})
];

Promise.all(removePromises).then(() => {
  /* All existing data has been removed.  */
  console.log(`Removed all data in ${constants._mongoDatabaseName} database.`);
  mongoose.disconnect();
}).catch((err) => {
  console.error('Error removing data.', err);
});
