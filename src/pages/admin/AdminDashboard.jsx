import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });

  useEffect(() => {
    api.get("/api/admin/issues/stats")
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Issues"
          value={stats.total}
          color="blue"
        />
        <StatCard
          title="Open Issues"
          value={stats.open}
          color="yellow"
        />
        <StatCard
          title="Resolved Issues"
          value={stats.resolved}
          color="green"
        />
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="font-semibold text-lg mb-2">System Overview</h3>
        <p className="text-gray-600 text-sm">
          This panel allows administrators to track, update, and resolve
          citizen issues efficiently. All actions are logged with timestamps.
        </p>
      </div>
    </>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;
