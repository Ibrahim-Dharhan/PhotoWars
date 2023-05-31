"use strict";

import mongoose = require('mongoose');
import dotenv = require('dotenv');
import async = require('async');
// import path = require('path');
dotenv.config();
// import { uploadFileToS3 } from '../definitions/s3';
import * as fs from 'fs/promises';
import * as constants from '../definitions/constants';

const MONGODB_URI = process.env['MONGODB_URI']
                    || 'mongodb://127.0.0.1:27017/'
                       + constants._mongoDatabaseName;
// const IMAGE_DIR = process.env['IMAGE_DIR'] || constants._imageDir;
mongoose.connect(MONGODB_URI);

const getLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset()
  const offsetAbs = Math.abs(offset)
  const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
  return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`
}

async function loadComment(this: any, comment: any, index: any, callback: any) {
  let commentIdx = index.toString();
  if (index <= 9) commentIdx = '0' + commentIdx; // Turns '9' into '09'

  /* Set _id.  */
  comment._id = this.commentPrefix + this.postIdx + commentIdx;

  /* Set creationTime.  */
  comment.creationTime = getLocalISOString(new Date());

  /* Set type of post.  */
  comment.commentedModel = this.model;

  /* Set post id.  */
  comment.post = this.postId;

  try {
    await Comment.create(comment);
    console.log(`Added comment "${comment.caption}" to database.`)
  } catch (err) {
    console.error(err);
  }
  callback();
}


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

  const battleDirs = await fs.readdir('./development/battles');
  await async.each(battleDirs, async (battleDir, callback) => {
    await generateBattleData(`./development/battles/${battleDir}`);
    callback();
  })

  mongoose.disconnect();
})();

export { getLocalISOString, loadComment };
