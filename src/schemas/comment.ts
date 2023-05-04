"use strict"

import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *         __v:
 *           type: Number 
 *         author_id:
 *           type: String
 *         creation_time:
 *           type: Date
 *         num_likes:
 *           type: Number
 *         submission_id:
 *           type: String
 *         text:
 *           type: String
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
