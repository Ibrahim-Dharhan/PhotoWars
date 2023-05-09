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
 *         authorId:
 *           type: string
 *         caption:
 *           type: string
 *         creationTime:
 *           type: string
 *           format: date-time
 *         filename:
 *           type: string
 *         numLikes:
 *           type: number
 */
const submissionSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  battleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Battle' },
  caption: String,
  creationTime: {type: Date, default: Date.now},
  filename: String,
  numVotes: Number
});

const Submission = mongoose.model('Submission', submissionSchema);

export { Submission };
