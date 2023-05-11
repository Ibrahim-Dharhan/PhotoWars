"use strict"

import mongoose = require('mongoose');
import { Vote } from './vote';

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         __v:
 *           type: number 
 *         authorId:
 *           type: string
 *         commentedModel:
 *           type: string
 *         creationTime:
 *           type: string
 *           format: date-time
 *         postId:
 *           type: string
 *         text:
 *           type: string
 */
const commentSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  commentedModel: {
    type: String,
    enum: ['Battle', 'Comment', 'Submission']
  },
  creationTime: {type: Date, default: Date.now},
  postId: { type: mongoose.Schema.Types.ObjectId,
            refPath: 'commentedModel' },
  text: String
});

/* Enforce that each Comment is unique.  */
commentSchema.index(
  { authorId: 1, commentedModel: 1, postId: 1 },
  { unique: true }
);

commentSchema.pre(['deleteMany'], async function() {
  const results = await Comment.find(this.getQuery(), '_id');
  const _ids = results.map(comment => comment._id);
  if (_ids.length === 0) return;

  /* Delete all votes on Comment.  */
  await Vote.deleteMany({
    votedModel: 'Comment',
    postId: { $in: _ids }
  });

  /* Delete all replies to Comment.  */
  await Comment.deleteMany({
    commentedModel: 'Comment',
    postId: { $in: _ids }
  });
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
