import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TrackGame from "./components/track-game/TrackGame";
import GameSettingsForm from "./components/game-settings-form/GameSettingsForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/track-game",
        element: <TrackGame />
    },
    {
        path: "/settings",
        element: <GameSettingsForm />
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
