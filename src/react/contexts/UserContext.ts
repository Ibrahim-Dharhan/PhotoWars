import { createContext } from 'react';

const UserContext = createContext({
  displayName: '',
  setDisplayName: null,
  open: false,
  setOpen: null,
  userId: '',
  setUserId: null,
});

export { UserContext };
