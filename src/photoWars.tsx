import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

/* Importing Components */
import { Home } from './react/pages/home/Home';
import { Create } from './react/pages/create/Create';

const PhotoWars = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
