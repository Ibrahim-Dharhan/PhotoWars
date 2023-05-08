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
 *         authorId:
 *           type: string
 *         creationTime:
 *           type: string
 *           format: date-time
 *         numLikes:
 *           type: number
 *         text:
 *           type: string
 */
const commentSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  creationTime: {type: Date, default: Date.now},
  numLikes: Number,
  text: String
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
