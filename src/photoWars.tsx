import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom';


/* Importing Components */
import { Battle } from './react/pages/battle/Battle';
import { Create } from './react/pages/create/Create';
import { Feed } from './react/pages/feed/Feed';
import { Home } from './react/pages/home/Home';
import { Layout } from './react/pages/Layout';
import { Submit } from './react/pages/submit/Submit';

const PhotoWars = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} >
          <Route path="battles" element={<Feed />} />
          <Route
            path="battle/:id"
            element={<Battle />}

          />
          <Route index element={<Feed />} />
        </Route>
        <Route path="/create" element={<Create />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    )
  );
  return (
    <React.StrictMode>
    <CssBaseline />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<PhotoWars />);
