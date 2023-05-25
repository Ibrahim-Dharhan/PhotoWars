'use strict';

import async = require('async');
import mongoose = require('mongoose');
import { Comment } from './comment';
import { AWS_BUCKET_NAME, deleteFileFromS3 } from '../../s3';
import { Submission } from './submission';
import { Vote } from './vote';

/**
 * @openapi
 * components:
 *   schemas:
 *     Battle:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         __v:
 *           type: number
 *         author:
 *           type: string
 *         caption:
 *           type: string
 *         creationTime:
 *           type: string
 *           format: date-time
 *         deadline:
 *           type: string
 *           format: date-time
 *         filename:
 *           type: string
 */
const battleSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  caption: String,
  creationTime: { type: Date, default: Date.now },
  deadline: Date,
  filename: String,
});

/* Middleware to delete or update Battle-related documents before deletion.  */
battleSchema.pre(['deleteMany', 'findOneAndDelete'], async function () {
  const results = await Battle.find(this.getQuery(), ['_id', 'filename']);
  const _ids = results.map((battle) => battle._id);
  const filenames = results.map((battle) => battle.filename);
  /* Delete all votes on Battle.  */
  await Vote.deleteMany({
    votedModel: 'Battle',
    post: { $in: _ids },
  });
  /* Delete all comments on Battle.  */
  await Comment.deleteMany({
    commentedModel: 'Battle',
    post: { $in: _ids },
  });
  /* Delete all submissions to Battle.  */
  await Submission.deleteMany({
    battle: { $in: _ids },
  });

  /* Delete image associated with Battle.  */
  if (AWS_BUCKET_NAME) {
    try {
      await async.each(filenames, deleteFileFromS3);
    } catch (err) {
      console.error(err);
    }
  }

});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
