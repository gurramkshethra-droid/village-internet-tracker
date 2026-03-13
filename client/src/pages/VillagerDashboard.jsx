import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiList, FiClock } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import { getComplaints } from "../services/api";

function VillagerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getComplaints();
      const complaints = res.data;
      setStats({
        total: complaints.length,
        pending: complaints.filter((c) => c.status === "Pending").length,
        resolved: complaints.filter((c) => c.status === "Resolved").length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout title="Dashboard">
      <h2 className="section-title">Welcome back 👋</h2>

      <div className="stats-grid">
        <div className="stat-card blue" onClick={() => navigate("/report")}>
          <div className="card-icon"><FiAlertCircle /></div>
          <div className="card-label">Report New Issue</div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Submit an internet complaint
          </p>
        </div>

        <div className="stat-card amber" onClick={() => navigate("/complaints")}>
          <div className="card-icon"><FiClock /></div>
          <div className="card-value">{stats.pending}</div>
          <div className="card-label">Pending Complaints</div>
        </div>

        <div className="stat-card emerald" onClick={() => navigate("/complaints")}>
          <div className="card-icon"><FiList /></div>
          <div className="card-value">{stats.total}</div>
          <div className="card-label">Total Complaints</div>
        </div>

        <div className="stat-card purple">
          <div className="card-icon">✅</div>
          <div className="card-value">{stats.resolved}</div>
          <div className="card-label">Resolved</div>
        </div>
      </div>
    </MainLayout>
  );
}

export default VillagerDashboard;