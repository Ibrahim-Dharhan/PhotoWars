"use strict"

import { Battle } from '../mongoose/battle';

const UpdateBattle = {
  deadline: {
    notEmpty: true,
    isDate: true,
  },
  displayName: {
    notEmpty: true,
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
  }
}

export { UpdateBattle };
