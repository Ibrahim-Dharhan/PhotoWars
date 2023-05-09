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
    enum: ['Battle', 'Submission']
  },
  creationTime: {type: Date, default: Date.now},
  postId: { type: mongoose.Schema.Types.ObjectId,
            refPath: 'commentedModel' },
  text: String
});

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
