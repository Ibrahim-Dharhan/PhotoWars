import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LoggedInUser, UserContext } from '../contexts/UserContext';

const Layout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(new LoggedInUser());

  const contextValue = { openLoginModal, setOpenLoginModal, loggedInUser, setLoggedInUser };
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);
    }
  }, []);
  return (
    <UserContext.Provider value={contextValue}>
      <Outlet />
    </UserContext.Provider>
  );
};

export { Layout };
