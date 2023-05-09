import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import axios from 'axios';

/* Importing Components */
import { Home } from './pages/home/Home';
import { Create } from './pages/create/Create';
import { Battle } from './pages/battle/Battle';
import Grid from '@mui/material/Grid';

import { Rightbar } from './components/rightbar/Rightbar';
import { Sidebar } from './components/sidebar/Sidebar';

const PhotoWars = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/battle' element={<Battle />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
