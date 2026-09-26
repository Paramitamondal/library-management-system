import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const emptyForm = { name: "", email: "", phone: "", address: "" };

const Members = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadMembers = () => api.get(`/members?search=${search}`).then((res) => setMembers(res.data));

  useEffect(() => { loadMembers(); }, [search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/members", form);
    setForm(emptyForm);
    setShowForm(false);
    loadMembers();
  };

  const handleDeactivate = async (id) => { await api.delete(`/members/${id}`); loadMembers(); };

  return (
    <div>
      <h2>Members</h2>
      <div className="search-row">
        <input placeholder="Search by name, email, member ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add Member"}</button>
      </div>

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group"><label>Name</label><input name="name" value={form.name} onChange={handleChange} required /></div>
            <div className="form-group"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
            <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} /></div>
            <div className="form-group"><label>Address</label><input name="address" value={form.address} onChange={handleChange} /></div>
            <div style={{ alignSelf: "end" }}><button className="btn btn-primary" type="submit">Save Member</button></div>
          </form>
        </div>
      )}

      <div className="card">
        <table className="data-table">
          <thead><tr><th>Member ID</th><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id}>
                <td>{m.memberId}</td><td>{m.name}</td><td>{m.email}</td>
                <td><span className={`badge ${m.status === "active" ? "badge-success" : "badge-muted"}`}>{m.status}</span></td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(m._id)}>Deactivate</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;