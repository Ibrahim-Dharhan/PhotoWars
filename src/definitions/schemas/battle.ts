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
 */
const battleSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  caption: String,
  creationTime: { type: Date, default: Date.now },
  deadline: Date,
  filename: String,
  numLikes: Number,
});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
