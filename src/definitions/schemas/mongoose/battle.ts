'use strict';

import mongoose = require('mongoose');
import { Comment } from './comment';
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
  const results = await Battle.find(this.getQuery(), '_id');
  const _ids = results.map((battle) => battle._id);
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
});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
