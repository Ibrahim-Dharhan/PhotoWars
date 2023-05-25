'use strict';

import async = require('async');
import mongoose = require('mongoose');
import { Comment } from './comment';
import { AWS_BUCKET_NAME, deleteFileFromS3 } from '../../s3';
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
 *         author:
 *           type: string
 *         battle:
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
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  battle: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle' },
  caption: String,
  creationTime: { type: Date, default: Date.now },
  filename: String,
});

/* Middleware to delete or update Submission-related documents before deletion.  */
submissionSchema.pre(['deleteMany', 'findOneAndDelete'], async function () {
  const results = await Submission.find(this.getQuery(), ['_id', 'filename']);
  const _ids = results.map((submission) => submission._id);
  const filenames = results.map((submission) => submission.filename);
  /* Delete all votes on Submission.  */
  await Vote.deleteMany({
    votedModel: 'Submission',
    post: { $in: _ids },
  });
  /* Delete comments on Submission.  */
  await Comment.deleteMany({
    commentedModel: 'Submission',
    post: { $in: _ids },
  });

  if (AWS_BUCKET_NAME) {
    try {
      await async.each(filenames, deleteFileFromS3);
    } catch (err) {
      console.error(err);
    }
  }
});

const Submission = mongoose.model('Submission', submissionSchema);

export { Submission };
