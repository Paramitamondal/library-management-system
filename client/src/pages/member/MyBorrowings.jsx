import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const MyBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await api.get("/members/me/profile");
        const res = await api.get(`/borrowings?memberId=${profile.data._id}`);
        setBorrowings(res.data);
      } catch {
        setBorrowings([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Borrowed Books</h2>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Book</th><th>Issue Date</th><th>Due Date</th><th>Status</th><th>Fine</th></tr></thead>
          <tbody>
            {borrowings.length === 0 && <tr><td colSpan="5">No borrowing records yet.</td></tr>}
            {borrowings.map((b) => (
              <tr key={b._id}>
                <td>{b.bookId?.title}</td>
                <td>{new Date(b.issueDate).toLocaleDateString()}</td>
                <td>{new Date(b.dueDate).toLocaleDateString()}</td>
                <td><span className={`badge ${b.status === "returned" ? "badge-success" : "badge-warning"}`}>{b.status}</span></td>
                <td>{b.fineAmount > 0 ? `₹${b.fineAmount}` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBorrowings;