"use strict"

import mongoose from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *         __v:
 *           type: Number 
 *         description:
 *           type: String
 *         file_name:
 *           type: String
 *         login_name:
 *           type: String
 *         login_password:
 *           type: String
 */
const userSchema = new mongoose.Schema({
  description: String,
  file_name: String,
  login_name: String,
  login_password: String
});

const User = mongoose.model('User', userSchema);

export { User };
