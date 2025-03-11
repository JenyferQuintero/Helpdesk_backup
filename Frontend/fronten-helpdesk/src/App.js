import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import HomeAdmiPage from "./pages/HomeAdmiPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/HomeAdmiPage" element={<HomeAdmiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
