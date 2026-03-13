import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VillagerDashboard from "./pages/VillagerDashboard";
import ReportIssue from "./pages/ReportIssue";
import Complaints from "./pages/Complaints";
import AdminDashboard from "./pages/AdminDashboard";

import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Pages */}
        <Route path="/user/dashboard" element={<VillagerDashboard />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/complaints" element={<Complaints />} />

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;