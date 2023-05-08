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
 *         displayName:
 *           type: string
 *         filename:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         loginName:
 *           type: string
 *         loginPassword:
 *           type: string
 */
const userSchema = new mongoose.Schema({
  description: String,
  displayName: String,
  filename: String,
  firstName: String,
  lastName: String,
  loginName: String,
  loginPassword: String
});

const User = mongoose.model('User', userSchema);

export { User };
