import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Layout = () => {
  const [displayName, setDisplayName] = useState(null);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
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
