import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Layout = () => {
  const [displayName, setDisplayName] = useState('Test');
  const [userId, setUserId] = useState('');
  const contextValue = { displayName, setDisplayName, userId, setUserId };
  return (
    <UserContext.Provider value={contextValue}>
      <Outlet />
    </UserContext.Provider>
  );
};

export { Layout };
