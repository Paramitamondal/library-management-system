import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const Borrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ bookId: "", memberId: "", dueDate: "" });
  const [showForm, setShowForm] = useState(false);

  const loadAll = () => {
    api.get("/borrowings").then((res) => setBorrowings(res.data));
    api.get("/books").then((res) => setBooks(res.data.books));
    api.get("/members").then((res) => setMembers(res.data));
  };

  useEffect(() => { loadAll(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleIssue = async (e) => {
    e.preventDefault();
    await api.post("/borrowings/issue", form);
    setForm({ bookId: "", memberId: "", dueDate: "" });
    setShowForm(false);
    loadAll();
  };

  const handleReturn = async (id) => { await api.post(`/borrowings/${id}/return`); loadAll(); };

  return (
    <div>
      <h2>Borrowings</h2>
      <div className="search-row">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Issue Book"}</button>
      </div>

      {showForm && (
        <div className="card">
          <form onSubmit={handleIssue} className="form-grid">
            <div className="form-group">
              <label>Book</label>
              <select name="bookId" value={form.bookId} onChange={handleChange} required>
                <option value="">Select book</option>
                {books.filter((b) => b.availableCopies > 0).map((b) => (
                  <option key={b._id} value={b._id}>{b.title} ({b.availableCopies} available)</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Member</label>
              <select name="memberId" value={form.memberId} onChange={handleChange} required>
                <option value="">Select member</option>
                {members.map((m) => <option key={m._id} value={m._id}>{m.name} ({m.memberId})</option>)}
              </select>
            </div>
            <div className="form-group"><label>Due Date</label><input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required /></div>
            <div style={{ alignSelf: "end" }}><button className="btn btn-primary" type="submit">Issue</button></div>
          </form>
        </div>
      )}

      <div className="card">
        <table className="data-table">
          <thead><tr><th>Book</th><th>Member</th><th>Issue Date</th><th>Due Date</th><th>Status</th><th>Fine</th><th>Action</th></tr></thead>
          <tbody>
            {borrowings.map((b) => (
              <tr key={b._id}>
                <td>{b.bookId?.title}</td>
                <td>{b.memberId?.name}</td>
                <td>{new Date(b.issueDate).toLocaleDateString()}</td>
                <td>{new Date(b.dueDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${b.status === "returned" ? "badge-success" : new Date(b.dueDate) < new Date() ? "badge-danger" : "badge-warning"}`}>
                    {b.status === "returned" ? "returned" : new Date(b.dueDate) < new Date() ? "overdue" : "borrowed"}
                  </span>
                </td>
                <td>{b.fineAmount > 0 ? `₹${b.fineAmount}` : "-"}</td>
                <td>{b.status !== "returned" && <button className="btn btn-outline btn-sm" onClick={() => handleReturn(b._id)}>Return</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Borrowings;