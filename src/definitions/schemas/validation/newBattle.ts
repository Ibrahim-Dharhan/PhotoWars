"use strict"

const NewBattle = {
  caption: {
    notEmpty: {
      errorMessage: 'Battle must have a caption.'
    }
  },
  deadline: {
    notEmpty: {
      errorMessage: 'Not a valid deadline.'
    // },
    // isNumber: {
    //   errorMessage: 'Must be a valid date.'
    }
  }
}

export { NewBattle };
