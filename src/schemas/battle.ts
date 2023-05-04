"use strict"

import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Battle:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *         __v:
 *           type: Number 
 *         author_id:
 *           type: String
 *         caption:
 *           type: String
 *         creation_time:
 *           type: Date
 *         deadline:
 *           type: Date
 *         file_name:
 *           type: String
 *         num_likes:
 *           type: Number 
 *         num_submissions:
 *           type: integer
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
