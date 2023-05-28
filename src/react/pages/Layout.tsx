import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LoggedInUser, UserContext } from '../contexts/UserContext';

const Layout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [loggedInUser, setLIU] = useState(new LoggedInUser());

  const saveToUserInLocalStorage = (properties) => {
    let storedUser = localStorage.getItem('user');
    storedUser = storedUser ? JSON.parse(storedUser) : {};
    Object.assign(storedUser, properties);
    localStorage.setItem('user', JSON.stringify(storedUser));
  }

  const setLoggedInUser = (user: LoggedInUser) => {
    setLIU(user);
    saveToUserInLocalStorage({ loggedInUser: user })
  };

  const contextValue = { openLoginModal, setOpenLoginModal, loggedInUser, setLoggedInUser };
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);
    }
  });
  return (
    <UserContext.Provider value={contextValue}>
      <Outlet />
    </UserContext.Provider>
  );
};

export { Layout };
