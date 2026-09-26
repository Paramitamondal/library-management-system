import { useEffect, useState } from "react";
import api from "../../api/apiClient";

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get(`/books?search=${search}`).then((res) => setBooks(res.data.books));
  }, [search]);

  return (
    <div>
      <h2>Browse Books</h2>
      <div className="search-row">
        <input placeholder="Search by title, author..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="book-grid">
        {books.map((b) => (
          <div key={b._id} className="book-card">
            <h4>{b.title}</h4>
            <p>by {b.author}</p>
            <p>{b.category?.name}</p>
            <p>
              {b.availableCopies > 0
                ? <span className="badge badge-success">{b.availableCopies} available</span>
                : <span className="badge badge-danger">Unavailable</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseBooks;