import React from 'react';
import { createRoot } from 'react-dom/client';

/* Importing Components */
import HelloWorld from './components/helloWorld/HelloWorld';

class PhotoWars extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <HelloWorld />
      </React.StrictMode>
    );
  }
}

// const rootElement = document.getElementById('root');
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);