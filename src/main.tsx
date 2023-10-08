import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Lobby } from "./pages/game/Lobby";
import { Play } from "./pages/game/Play/play.tsx";
import { GameLayout } from "./features/Game/GameContext.tsx";
import { Character } from "./pages/character/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "game",
    element: <GameLayout />,
    children: [
      {
        path: "Lobby",
        element: <Lobby />,
      },
      {
        path: "play",
        element: <Play />,
      },
    ],
  },
  {
    path: "/character",
    element: <Character />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
