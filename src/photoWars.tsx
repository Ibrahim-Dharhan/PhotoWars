import React from 'react';
import { createRoot } from 'react-dom/client';

/* Importing Components */
import { Home } from './pages/home/Home';

const PhotoWars = () => {
  return (
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
