"use strict"

import mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         __v:
 *           type: number 
 *         description:
 *           type: string
 *         display_name:
 *           type: string
 *         file_name:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         login_name:
 *           type: string
 *         login_password:
 *           type: string
 */
const userSchema = new mongoose.Schema({
  description: String,
  display_name: String,
  file_name: String,
  first_name: String,
  last_name: String,
  login_name: String,
  login_password: String
});

const User = mongoose.model('User', userSchema);

export { User };
