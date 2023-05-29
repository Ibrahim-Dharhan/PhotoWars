import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

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

interface IUserContext {
  openLoginModal: boolean;
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser: LoggedInUser;
  setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUser>>;
}

let UserContext = {} as React.Context<IUserContext>;

const Layout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(new LoggedInUser());
  UserContext = createContext<IUserContext>({
    openLoginModal: openLoginModal,
    setOpenLoginModal: setOpenLoginModal,
    loggedInUser: loggedInUser,
    setLoggedInUser: setLoggedInUser
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);
    }
  }, []);

  return (
    <Outlet />
  );
};

export { Layout, LoggedInUser, UserContext };
