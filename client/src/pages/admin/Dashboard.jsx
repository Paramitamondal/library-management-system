import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    api.get("/dashboard/statistics").then((res) => setStats(res.data));
    api.get("/dashboard/recent-activity").then((res) => setActivity(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="card-grid">
        <div className="stat-card"><div className="value">{stats.totalBooks}</div><div className="label">Total Books</div></div>
        <div className="stat-card"><div className="value">{stats.availableBooks}</div><div className="label">Available</div></div>
        <div className="stat-card"><div className="value">{stats.borrowedBooks}</div><div className="label">Borrowed</div></div>
        <div className="stat-card"><div className="value">{stats.totalMembers}</div><div className="label">Members</div></div>
        <div className="stat-card"><div className="value">{stats.overdueBooks}</div><div className="label">Overdue</div></div>
      </div>

      {activity && (
        <div className="card">
          <h3>Recently Added Books</h3>
          <table className="data-table">
            <thead><tr><th>Title</th><th>Author</th></tr></thead>
            <tbody>
              {activity.recentBooks.map((b) => (
                <tr key={b._id}><td>{b.title}</td><td>{b.author}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
