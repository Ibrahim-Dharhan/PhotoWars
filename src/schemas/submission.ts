"use strict"

import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Submission:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *         __v:
 *           type: Number 
 *         author_id:
 *           type: String
 *         caption:
 *           type: String
 *         creation_time:
 *           type: Date
 *         file_name:
 *           type: String
 *         num_likes:
 *           type: Number 
 *         num_comments:
 *           type: Number 
 */
const submissionSchema = new mongoose.Schema({
  author_id: mongoose.Schema.Types.ObjectId,
  caption: String,
  creation_time: {type: Date, default: Date.now},
  file_name: String,
  num_votes: Number,
  num_comments: Number
});

const Submission = mongoose.model('Submission', submissionSchema);

export { Submission };
