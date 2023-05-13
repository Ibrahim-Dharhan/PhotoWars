import { createContext } from 'react';

const UserContext = createContext({
  displayName: '',
  setDisplayName: null,
  userId: '',
  setUserId: null,
});

export { UserContext };
