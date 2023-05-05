import React from 'react';
import { createRoot } from 'react-dom/client';

/* Importing Components */
import { HelloWorld } from './components/helloWorld/HelloWorld';

const PhotoWars = () => {
  return (
    <React.StrictMode>
      <HelloWorld />
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
