"use strict"

import mongoose = require('mongoose');

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
 *         author_id:
 *           type: string
 *         creation_time:
 *           type: string
 *           format: date-time
 *         num_likes:
 *           type: number
 *         submission_id:
 *           type: string
 *         text:
 *           type: string
 */
const commentSchema = new mongoose.Schema({
  author_id: mongoose.Schema.Types.ObjectId,
  creation_time: {type: Date, default: Date.now},
  num_likes: Number,
  submission_id: mongoose.Schema.Types.ObjectId,
  text: String
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
