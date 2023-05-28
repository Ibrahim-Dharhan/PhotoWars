import { createContext } from 'react';

class LoggedInUser {
  _id: string;
  description: string;
  displayName: string;
  filename: string;
  firstName: string;
  lastName: string;

  constructor() {
    this._id = '';
    this.description = '';
    this.displayName = '';
    this.filename = '';
    this.firstName = '';
    this.lastName = '';
  }
}


const UserContext = createContext({
  openLoginModal: false,
  setOpenLoginModal: null,
  loggedInUser: new LoggedInUser(),
  setLoggedInUser: null
});

export { LoggedInUser, UserContext };
