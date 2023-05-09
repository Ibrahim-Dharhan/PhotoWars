"use strict"

import mongoose = require('mongoose');
import { Comment } from './comment';

/**
 * @openapi
 * components:
 *   schemas:
 *     Submission:
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
 *         filename:
 *           type: string
 *         numLikes:
 *           type: number 
 *         numComments:
 *           type: number 
 */
const submissionSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  battleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle' },
  caption: String,
  creationTime: {type: Date, default: Date.now},
  filename: String,
  numVotes: Number
});

/* Middleware to delete or update Submission-related documents before deletion.  */
submissionSchema.pre('remove', async function() {
  const results = await Submission.find(this.getQuery(), '_id');
  const _ids = results.map(submission => submission._id);
  /* Delete comments on Submission.  */
  await Comment.deleteMany({
    commentedModel: 'Submission',
    postId: { $in: _ids }
  });
});

const Submission = mongoose.model('Submission', submissionSchema);

export { Submission };
