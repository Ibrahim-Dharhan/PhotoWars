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
 *         comment_ids:
 *           type: array
 *           items:
 *             type: string
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
 *         submission_ids:
 *           type: array
 *           items:
 *             type: string
 */
const battleSchema = new mongoose.Schema({
  author_id: mongoose.Schema.Types.ObjectId,
  caption: String,
  creation_time: {type: Date, default: Date.now},
  comment_ids: [mongoose.Schema.Types.ObjectId],
  deadline: Date,
  file_name: String,
  num_likes: Number,
  submission_ids: [mongoose.Schema.Types.ObjectId]
});

const Battle = mongoose.model('Battle', battleSchema);

export { Battle };
