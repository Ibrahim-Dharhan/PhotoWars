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
 *         author_id:
 *           type: string
 *         caption:
 *           type: string
 *         creation_time:
 *           type: string
 *           format: date-time
 *         deadline:
 *           type: string
 *           format: date-time
 *         file_name:
 *           type: string
 *         num_likes:
 *           type: number 
 *         num_submissions:
 *           type: number
 */
const battleSchema = new mongoose.Schema({
  author_id: mongoose.Schema.Types.ObjectId,
  caption: String,
  creation_time: {type: Date, default: Date.now},
  deadline: Date,
  file_name: String,
  num_likes: Number,
  num_submissions: Number
});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
