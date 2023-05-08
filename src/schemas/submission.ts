"use strict"

import mongoose = require('mongoose');

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
 *         author_id:
 *           type: string
 *         caption:
 *           type: string
 *         comment_ids:
 *           type: array
 *             items:
 *               type: string
 *         creation_time:
 *           type: string
 *           format: date-time
 *         file_name:
 *           type: string
 *         num_likes:
 *           type: number 
 *         num_comments:
 *           type: number 
 */
const submissionSchema = new mongoose.Schema({
  author_id: mongoose.Schema.Types.ObjectId,
  caption: String,
  comment_ids: [mongoose.Schema.Types.ObjectId],
  creation_time: {type: Date, default: Date.now},
  file_name: String,
  num_votes: Number
});

const Submission = mongoose.model('Submission', submissionSchema);

export { Submission };
