import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { addComplaint } from "../services/api";

function ReportIssue() {
  const [formData, setFormData] = useState({
    village: "",
    provider: "",
    issueType: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await addComplaint(formData);
      setSuccess(true);
      setFormData({ village: "", provider: "", issueType: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Report Issue">
      <div className="form-wrapper">
        <div className="form-card">
          <h2>Report Internet Issue</h2>

          {success && (
            <div className="success-message">
              ✅ Complaint submitted successfully!
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Village Name</label>
              <input
                type="text"
                name="village"
                placeholder="Enter your village name"
                value={formData.village}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Internet Provider</label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                required
              >
                <option value="">Select Provider</option>
                <option value="Jio">Jio</option>
                <option value="Airtel">Airtel</option>
                <option value="BSNL">BSNL</option>
                <option value="Vi">Vi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Issue Type</label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                required
              >
                <option value="">Select Issue</option>
                <option value="No Signal">No Signal</option>
                <option value="Slow Internet">Slow Internet</option>
                <option value="Network Outage">Network Outage</option>
                <option value="Frequent Disconnection">Frequent Disconnection</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default ReportIssue;