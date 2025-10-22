import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./views/Homepage.jsx";
import LandingPage from "./views/LandingPage.jsx";
import GamePage from "./views/GamePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
