"use strict"

import { User } from '../mongoose/user';

const NewUser = {
  displayName: {
    isLength: {
      options: {
        min: 3
      },
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

export { NewUser };
