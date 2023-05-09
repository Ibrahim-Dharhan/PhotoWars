"use strict"

import mongoose = require('mongoose');
import { Comment } from './comment';
import { Vote } from './vote';

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
 */
const submissionSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  battleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle' },
  caption: String,
  creationTime: {type: Date, default: Date.now},
  filename: String
});

/* Middleware to delete or update Submission-related documents before deletion.  */
submissionSchema.pre('remove', async function() {
  const results = await Submission.find(this.getQuery(), '_id');
  const _ids = results.map(submission => submission._id);
  /* Delete all votes on Submission.  */
  await Vote.deleteMany({
    votedModel: 'Submission',
    postId: { $in: _ids }
  });
  /* Delete comments on Submission.  */
  await Comment.deleteMany({
    commentedModel: 'Submission',
    postId: { $in: _ids }
  });
});

const Submission = mongoose.model('Submission', submissionSchema);

export { Submission };
