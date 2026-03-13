import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getComplaints } from "../services/api";

function Complaints() {
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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <MainLayout title="My Complaints">
      <div className="table-section">
        <div className="table-header">
          <h2>My Complaints</h2>
          <span className="count-badge">{complaints.length} total</span>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No complaints submitted yet</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Village</th>
                <th>Provider</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td style={{ fontFamily: "'Fira Code', monospace", fontSize: "0.82rem" }}>
                    #{c._id.slice(-5)}
                  </td>
                  <td>{c.village}</td>
                  <td>{c.provider}</td>
                  <td>{c.issueType}</td>
                  <td>{getStatusBadge(c.status)}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {formatDate(c.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
}

export default Complaints;