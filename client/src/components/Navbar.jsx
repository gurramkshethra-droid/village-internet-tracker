import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

function Navbar({ title }) {
  const navigate = useNavigate();

  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="navbar">
      <span className="page-title">{title || "Dashboard"}</span>

      <div className="nav-right">
        <div className="user-info">
          <div className="user-avatar">{getInitials(user?.name)}</div>
          <span className="user-name">{user?.name || "User"}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;