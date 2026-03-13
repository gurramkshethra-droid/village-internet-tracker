import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children, title }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-area">
        <Navbar title={title} />
        <div className="page-content fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;