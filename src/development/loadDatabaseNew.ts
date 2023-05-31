"use strict";

import mongoose = require('mongoose');
import dotenv = require('dotenv');
// import path = require('path');
dotenv.config();
// import { uploadFileToS3 } from '../definitions/s3';
import * as constants from '../definitions/constants';

const MONGODB_URI = process.env['MONGODB_URI']
                    || 'mongodb://127.0.0.1:27017/'
                       + constants._mongoDatabaseName;
// const IMAGE_DIR = process.env['IMAGE_DIR'] || constants._imageDir;
mongoose.connect(MONGODB_URI);

/* Mongoose schemas.  */
import { Battle } from '../definitions/schemas/mongoose/battle';
import { Comment } from '../definitions/schemas/mongoose/comment';
import { Submission } from '../definitions/schemas/mongoose/submission';
import { User } from '../definitions/schemas/mongoose/user';
import { Vote } from '../definitions/schemas/mongoose/vote';
import { generateBattleData } from './generateBattleData';

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

  await generateBattleData('./battles');

  mongoose.disconnect();
})();
