"use strict"

import mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         __v:
 *           type: number 
 *         creationTime:
 *           type: string
 *           format: date-time
 *         postId:
 *           type: string
 *         userId:
 *           type: string
 *         votedModel:
 *           type: string
 */
const voteSchema = new mongoose.Schema({
  creationTime: {type: Date, default: Date.now},
  postId: { type: mongoose.Schema.Types.ObjectId,
            refPath: 'votedModel' },
  userId: mongoose.Schema.Types.ObjectId,
  votedModel: {
    type: String,
    enum: ['Battle', 'Comment', 'Submission']
  },
});


const Vote = mongoose.model('Vote', voteSchema);

export { Vote };
