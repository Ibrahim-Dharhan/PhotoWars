import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';


/* Importing Components */
import { BattleView } from './react/pages/battleView/BattleView';
import { Create } from './react/pages/create/Create';
import { Feed, feedLoader } from './react/pages/feed/Feed';
import { Home } from './react/pages/home/Home';
import { Layout } from './react/pages/Layout';
import { SubmissionFeed, submissionFeedLoader } from './react/pages/submissionFeed/SubmissionFeed';
import { Submit } from './react/pages/submit/Submit';

const PhotoWars = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} >
          <Route
            path="battles/:id"
            element={<BattleView />}
            errorElement={<div>Error viewing battle</div>}
          >
            <Route
              index
              element={<SubmissionFeed/>}
              loader={submissionFeedLoader}
              errorElement={<div>Error loading submissions</div>}
            />
          </Route>
          <Route path="create" element={<Create />} />
          <Route path="submit" element={<Submit />} />
          <Route
            index
            element={<Feed />}
            loader={feedLoader}
            errorElement={<div>Error fetching battles</div>}
          />
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
