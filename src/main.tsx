import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Lobby } from './pages/game/lobby';
import { Play } from './pages/game/Playhoge/index.tsx';
import { GameLayout } from './features/Game/GameContext.tsx';
import { Character } from './pages/character';
import { Ranking } from './pages/game/Rankinghoge/index.tsx';

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
