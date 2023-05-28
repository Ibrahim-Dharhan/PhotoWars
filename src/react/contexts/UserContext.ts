import { createContext } from 'react';

const UserContext = createContext({
  displayName: '',
  setDisplayName: null,
  openLoginModal: false,
  setOpenLoginModal: null,
  userId: '',
  setUserId: null,
});

export { UserContext };
