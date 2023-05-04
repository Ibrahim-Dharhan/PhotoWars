import React from 'react';
import { createRoot } from 'react-dom/client';

/* Importing Components */
import HelloWorld from './components/helloWorld/HelloWorld';
import Test from './components/sideBar/SideBar';

class PhotoWars extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Test />
      </React.StrictMode>
    );
  }
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
