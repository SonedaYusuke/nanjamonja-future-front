import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Lobby } from './pages/game/Lobby';
import { Play } from './pages/game/Play/play.tsx';
import { GameLayout } from './features/Game/GameContext.tsx';
import { Character } from './pages/character/index.tsx';
import { Ranking } from './pages/game/Ranking/ranking.tsx';

const router = createBrowserRouter([
  {
    path: 'game',
    element: <GameLayout />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
