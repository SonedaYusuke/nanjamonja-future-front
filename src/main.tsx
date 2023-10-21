import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Lobby } from './pages/game/lobby';
import { Play } from './pages/game/play';
import { Character } from './pages/character';
import { Ranking } from './pages/game/ranking';
import { SWRConfig } from 'swr';

const router = createBrowserRouter([
  {
    path: 'game',
    children: [
      {
        path: 'lobby',
        element: <Lobby />,
      },
      {
        path: 'play',
        element: <Play />,
      },
      {
        path: 'ranking',
        element: <Ranking />,
      },
    ],
  },
  {
    path: '/character',
    element: <Character />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
);
