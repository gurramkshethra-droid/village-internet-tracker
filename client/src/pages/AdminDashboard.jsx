import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Analytics from "../components/Analytics";
import { getComplaints, updateComplaintStatus, deleteComplaint } from "../services/api";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await getComplaints();
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await deleteComplaint(id);
      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusBadge = (status) => {
    let cls = "pending";
    if (status === "In Progress") cls = "in-progress";
    if (status === "Resolved") cls = "resolved";
    return (
      <span className={`status-badge ${cls}`}>
        <span className="dot"></span>
        {status}
      </span>
    );
  };

  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <MainLayout title="Admin Dashboard">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="card-icon">📊</div>
          <div className="card-value">{complaints.length}</div>
          <div className="card-label">Total Complaints</div>
        </div>
        <div className="stat-card amber">
          <div className="card-icon">⏳</div>
          <div className="card-value">{pending}</div>
          <div className="card-label">Pending</div>
        </div>
        <div className="stat-card cyan">
          <div className="card-icon">🔄</div>
          <div className="card-value">{inProgress}</div>
          <div className="card-label">In Progress</div>
        </div>
        <div className="stat-card emerald">
          <div className="card-icon">✅</div>
          <div className="card-value">{resolved}</div>
          <div className="card-label">Resolved</div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="table-section">
        <div className="table-header">
          <h2>Complaint Management</h2>
          <span className="count-badge">{complaints.length} complaints</span>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No complaints found</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Village</th>
                <th>Provider</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.82rem" }}>
                    #{c._id.slice(-5)}
                  </td>
                  <td>{c.name}</td>
                  <td>{c.village}</td>
                  <td>{c.provider}</td>
                  <td>{c.issueType}</td>
                  <td>{getStatusBadge(c.status)}</td>
                  <td>
                    <div className="action-group">
                      <select
                        className="action-select"
                        value={c.status}
                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Analytics */}
      {complaints.length > 0 && <Analytics complaints={complaints} />}
    </MainLayout>
  );
}

export default AdminDashboard;