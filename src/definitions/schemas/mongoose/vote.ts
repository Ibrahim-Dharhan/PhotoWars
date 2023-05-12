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
 *         post:
 *           type: string
 *         user:
 *           type: string
 *         votedModel:
 *           type: string
 */
const voteSchema = new mongoose.Schema({
  creationTime: {type: Date, default: Date.now},
  post: { type: mongoose.Schema.Types.ObjectId,
            refPath: 'votedModel' },
  user: mongoose.Schema.Types.ObjectId,
  votedModel: {
    type: String,
    enum: ['Battle', 'Comment', 'Submission']
  },
});

/* Enforce that each Vote is unique.  */
voteSchema.index(
  { post: 1, user: 1, votedModel: 1 },
  { unique: true }
);

const Vote = mongoose.model('Vote', voteSchema);

const voteOn = async (modelName: string, id: string, user: string) => {
  const vote = {
    post: id,
    user: user,
    votedModel: modelName
  };
  try {
    await Vote.findOneAndUpdate(vote, vote, { upsert: true }).lean().exec();
  } catch (err) {
    console.log(err);
  }
};

const unvoteOn = async (modelName: string, id: string, user: string) => {
  const vote = {
    post: id,
    user: user,
    votedModel: modelName
  };
  try {
    await Vote.findOneAndDelete(vote).lean().exec();
  } catch (err) {
    console.log(err);
  }
};

export { Vote, voteOn, unvoteOn };
