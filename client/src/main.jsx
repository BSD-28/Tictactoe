import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage.jsx";
import Homepage from "./views/Homepage.jsx";
import VsAi from "./views/VsAi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/vs-ai" element={<VsAi />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
