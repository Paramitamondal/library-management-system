import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const emptyForm = { isbn: "", title: "", author: "", category: "", publisher: "", publicationYear: "", totalCopies: 1, location: "" };

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const loadBooks = () => api.get(`/books?search=${search}`).then((res) => setBooks(res.data.books));
  const loadCategories = () => api.get("/categories").then((res) => setCategories(res.data));

  useEffect(() => { loadBooks(); loadCategories(); }, []);
  useEffect(() => { loadBooks(); }, [search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await api.put(`/books/${editId}`, form);
    else await api.post("/books", form);
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    loadBooks();
  };

  const handleEdit = (book) => {
    setForm({
      isbn: book.isbn, title: book.title, author: book.author,
      category: book.category?._id || "", publisher: book.publisher || "",
      publicationYear: book.publicationYear || "", totalCopies: book.totalCopies,
      location: book.location || "",
    });
    setEditId(book._id);
    setShowForm(true);
  };

  const handleDeactivate = async (id) => { await api.delete(`/books/${id}`); loadBooks(); };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    await api.post("/categories", { name: newCategory });
    setNewCategory("");
    loadCategories();
  };

  return (
    <div>
      <h2>Books</h2>

      <div className="card">
        <h3>Categories</h3>
        <form onSubmit={handleAddCategory} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
          <input placeholder="New category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button className="btn btn-primary btn-sm" type="submit">Add</button>
        </form>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((c) => <span key={c._id} className="badge badge-muted">{c.name}</span>)}
        </div>
      </div>

      <div className="search-row">
        <input placeholder="Search by title, author, ISBN..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "+ Add Book"}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group"><label>ISBN</label><input name="isbn" value={form.isbn} onChange={handleChange} required /></div>
            <div className="form-group"><label>Title</label><input name="title" value={form.title} onChange={handleChange} required /></div>
            <div className="form-group"><label>Author</label><input name="author" value={form.author} onChange={handleChange} required /></div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Publisher</label><input name="publisher" value={form.publisher} onChange={handleChange} /></div>
            <div className="form-group"><label>Publication Year</label><input name="publicationYear" type="number" value={form.publicationYear} onChange={handleChange} /></div>
            <div className="form-group"><label>Total Copies</label><input name="totalCopies" type="number" min="1" value={form.totalCopies} onChange={handleChange} required /></div>
            <div className="form-group"><label>Shelf Location</label><input name="location" value={form.location} onChange={handleChange} /></div>
            <div style={{ alignSelf: "end" }}>
              <button className="btn btn-primary" type="submit">{editId ? "Update Book" : "Save Book"}</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table className="data-table">
          <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Available</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.category?.name || "-"}</td>
                <td>{b.availableCopies}/{b.totalCopies}</td>
                <td><span className={`badge ${b.status === "active" ? "badge-success" : "badge-muted"}`}>{b.status}</span></td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => handleEdit(b)}>Edit</button>{" "}
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(b._id)}>Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;