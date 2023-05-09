import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Recent from "./Recent";
import Mostlike from "./Mostlike"
import RegisterPage from "./RegisterPage"

function AppRouter() {
  return (
    <Router>
      <Routes>
      <Route path="/Home" element={<App />} />
      <Route path="/Recent" element={<Recent />} />
      <Route path="/Mostlike" element={<Mostlike />} />
      <Route path="/" element={<RegisterPage />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
