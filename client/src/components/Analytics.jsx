import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import "../styles/app.css";

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e"];

function Analytics({ complaints }) {
  // Complaints by provider
  const providerMap = {};
  complaints.forEach((c) => {
    providerMap[c.provider] = (providerMap[c.provider] || 0) + 1;
  });
  const providerData = Object.keys(providerMap).map((key) => ({
    name: key,
    value: providerMap[key],
  }));

  // Complaints by status
  const statusData = [
    { name: "Pending", value: complaints.filter((c) => c.status === "Pending").length },
    { name: "In Progress", value: complaints.filter((c) => c.status === "In Progress").length },
    { name: "Resolved", value: complaints.filter((c) => c.status === "Resolved").length },
  ].filter((d) => d.value > 0);

  const STATUS_COLORS = { Pending: "#f59e0b", "In Progress": "#3b82f6", Resolved: "#10b981" };

  return (
    <div className="analytics-grid">
      <div className="chart-card">
        <h3>Complaints by Provider</h3>
        {providerData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={providerData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                label={({ name, value }) => `${name} (${value})`}
                labelLine={false}
              >
                {providerData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
            No data available
          </p>
        )}
      </div>

      <div className="chart-card">
        <h3>Complaint Status</h3>
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
            No data available
          </p>
        )}
      </div>
    </div>
  );
}

export default Analytics;