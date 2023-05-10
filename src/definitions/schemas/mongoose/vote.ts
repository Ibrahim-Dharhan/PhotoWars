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

/* Enforce that each Vote is unique.  */
voteSchema.index(
  { postId: 1, userId: 1, votedModel: 1 },
  { unique: true }
);

const Vote = mongoose.model('Vote', voteSchema);

const voteOn = async (modelName: String, id: String, userId: String) => {
  const vote = {
    postId: id,
    userId: userId,
    votedModel: modelName
  };
  try {
    await Vote.findOneAndUpdate(vote, vote, { upsert: true }).lean().exec();
  } catch (err) {
    console.log(err);
  }
};

export { Vote, voteOn };
