"use strict"

import mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     Battle:
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
 *         commentIds:
 *           type: array
 *           items:
 *             type: string
 *         creationTime:
 *           type: string
 *           format: date-time
 *         deadline:
 *           type: string
 *           format: date-time
 *         filename:
 *           type: string
 *         numLikes:
 *           type: number 
 *         submissionIds:
 *           type: array
 *           items:
 *             type: string
 */
const battleSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  caption: String,
  creationTime: {type: Date, default: Date.now},
  commentIds: [mongoose.Schema.Types.ObjectId],
  deadline: Date,
  filename: String,
  numLikes: Number,
  submissionIds: [mongoose.Schema.Types.ObjectId]
});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
