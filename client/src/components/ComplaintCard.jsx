import React from "react";
import "../styles/app.css";

function ComplaintCard({ complaint }) {
  const { _id, village, provider, issueType, description, status, createdAt } = complaint;

  const getStatusClass = () => {
    if (status === "Pending") return "pending";
    if (status === "In Progress") return "in-progress";
    if (status === "Resolved") return "resolved";
    return "";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="complaint-card">
      <div className="card-top">
        <span className="card-id">#{_id?.slice(-6)}</span>
        <span className={`status-badge ${getStatusClass()}`}>
          <span className="dot"></span>
          {status}
        </span>
      </div>

      <div className="card-body">
        <h4>{issueType}</h4>
        {description && (
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
            {description}
          </p>
        )}
      </div>

      <div className="card-meta">
        <span className="meta-item">📍 {village}</span>
        <span className="meta-item">📡 {provider}</span>
        <span className="meta-item">📅 {formatDate(createdAt)}</span>
      </div>
    </div>
  );
}

export default ComplaintCard;
