"use strict"

import mongoose = require('mongoose');
import { Comment } from './comment';
import { Submission } from './submission';

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
 *         authorId:
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
 *         numLikes:
 *           type: number 
 */
const battleSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  caption: String,
  creationTime: { type: Date, default: Date.now },
  deadline: Date,
  filename: String,
  numLikes: Number,
});

/* Middleware to delete or update Battle-related documents before deletion.  */
battleSchema.pre(['deleteMany'], async function() {
  const results = await Battle.find(this.getQuery(), '_id');
  const _ids = results.map(battle => battle._id);
  /* Delete all comments in Battle.  */
  await Comment.deleteMany({
    commentedModel: 'Battle',
    postId: { $in: _ids }
  });
  /* Delete all submissions to Battle.  */
  await Submission.deleteMany({
    battleId: { $in: _ids }
  });
});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
