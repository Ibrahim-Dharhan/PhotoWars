import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


/* Importing Components */
import { Create } from './react/pages/create/Create';
import { Home } from './react/pages/home/Home';
import { Submit } from './react/pages/submit/Submit';

const PhotoWars = () => {
  return (
    <React.StrictMode>
    <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/submit' element={<Submit />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
