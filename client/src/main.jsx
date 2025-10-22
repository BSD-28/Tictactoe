import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./views/HomePage.jsx";
import LandingPage from "./views/LandingPage.jsx";
import GamePage from "./views/GamePage.jsx";
import VsAi from "./views/VsAi.jsx";
import BaseLayout from "./views/BaseLayout.jsx";
import ThemeContext from "./context/ThemeContext.jsx";
import "toastify-js/src/toastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/vs-ai" element={<VsAi />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext>
  </StrictMode>
);
