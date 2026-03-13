import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiAlertCircle, FiList, FiBarChart2, FiLogOut } from "react-icons/fi";
import "../styles/app.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const role = user?.role || "user";

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>VillageNet</h2>
        <span>Internet Complaint Tracker</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Navigation</div>

        {role === "admin" ? (
          <>
            <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>
              <span className="icon"><FiBarChart2 /></span> Admin Dashboard
            </Link>
            <Link to="/complaints" className={isActive("/complaints")}>
              <span className="icon"><FiList /></span> All Complaints
            </Link>
          </>
        ) : (
          <>
            <Link to="/user/dashboard" className={isActive("/user/dashboard")}>
              <span className="icon"><FiGrid /></span> Dashboard
            </Link>
            <Link to="/report" className={isActive("/report")}>
              <span className="icon"><FiAlertCircle /></span> Report Issue
            </Link>
            <Link to="/complaints" className={isActive("/complaints")}>
              <span className="icon"><FiList /></span> My Complaints
            </Link>
          </>
        )}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border-glass)" }}>
        <button className="btn-logout" onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;