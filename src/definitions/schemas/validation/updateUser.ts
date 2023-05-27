"use strict"

import { User } from '../mongoose/user';

const UpdateUser = {
  description: {},
  displayName: {
    isLength: {
      options: {
        min: 3
      },
    },
    displayNameNotInUse: {
      custom: async (displayName, { req }) => {
        const userId = req.session.userId;
        const query = User.findOne({ 
          displayName: displayName
        });
        const userObj = await query.lean().exec();
        if (userObj && userObj._id.toString() !== userId) {
          return Promise.reject('Display name already in use.');
        }
      }
    }
  },
  firstName: {},
  lastName: {}
}

export { UpdateUser };
