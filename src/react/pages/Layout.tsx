import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Layout = () => {
  const [displayName, setDN] = useState(null);
  const [open, setOpen] = useState(false);
  const [userId, setUI] = useState(null);

  const saveToUserInLocalStorage = (properties) => {
    let storedUser = localStorage.getItem('user');
    storedUser = storedUser ? JSON.parse(storedUser) : {};
    Object.assign(storedUser, properties);
    localStorage.setItem('user', JSON.stringify(storedUser));
  }

  const setDisplayName = (displayName) => {
    setDN(displayName);
    saveToUserInLocalStorage({displayName: displayName});
  };

  const setUserId = (userId) => {
    setUI(userId);
    saveToUserInLocalStorage({_id: userId});
  };

  const contextValue = { displayName, setDisplayName, open, setOpen, userId, setUserId };
  useEffect(() => {
    let name = '';
    let id = '';
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      name = user.displayName;
      id = user._id;
    }
    setDisplayName(name);
    setUserId(id);
  }, []);
  return (
    <UserContext.Provider value={contextValue}>
      <Outlet />
    </UserContext.Provider>
  );
};

export { Layout };
