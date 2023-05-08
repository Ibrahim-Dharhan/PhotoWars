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

const newUserSchema = {
  displayName: {
    isLength: {
      options: {
        min: 8
      },
      errorMessage: 'Must be at least 8 characters.'
    },
    displayNameNotInUse: {
      custom: async (displayName) => {
        const query = User.findOne({ 
          displayName: displayName
        });
        const userObj = await query.lean().exec();
        if (userObj) {
          return Promise.reject('Display name already in use.');
        }
      }
    }
  },
  loginName: {
    isLength: {
      options: {
        min: 6
      },
      errorMessage: 'Must be at least 6 characters.'
    },
    loginNameNotInUse: {
      custom: async (loginName) => {
        const query = User.findOne({ 
          loginName: loginName
        });
        const userObj = await query.lean().exec();
        if (userObj) {
          return Promise.reject('Login name already in use.');
        }
      }
    }
  },
  loginPassword: {
    isLength: {
      options: {
        min: 8
      },
      errorMessage: 'Must be at least 8 characters.'
    }
  }
}

export { User, newUserSchema };
