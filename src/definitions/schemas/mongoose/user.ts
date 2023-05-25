"use strict"

import mongoose = require('mongoose');
import { Battle } from './battle';
import { Comment } from './comment';
import { Submission } from './submission';
import { Vote } from './vote';

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
interface IUserShared {
  description: string,
  displayName: string,
  filename: string,
  firstName: string,
  lastName: string,
}

interface IUserFrontend extends IUserShared {
  _id: string
}

interface IUserBackend extends IUserShared {
  loginName: string,
  loginPassword: string
}

const userSchema = new mongoose.Schema({
  description: String,
  displayName: String,
  filename: String,
  firstName: String,
  lastName: String,
  loginName: String,
  loginPassword: String
} as Record<keyof IUserBackend, StringConstructor>);

/* Middleware to delete or update User-related documents before deletion.  */
userSchema.pre(['findOneAndDelete'], async function() {
  const _id = this.getQuery()._id;
  /* Delete user Votes.  */
  await Vote.deleteMany({ user: _id });
  /* Delete user-owned Comments.  */
  await Comment.deleteMany({ author: _id });
  /* Delete user-owned Submissions.  */
  await Submission.deleteMany({ author: _id });
  /* Delete user-owned Battles.  */
  await Battle.deleteMany({ author: _id });
});

const User = mongoose.model('User', userSchema);

export { User, IUserFrontend };
