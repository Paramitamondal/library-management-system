import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Name</label><input name="name" onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input name="email" type="email" onChange={handleChange} required /></div>
          <div className="form-group"><label>Password</label><input name="password" type="password" onChange={handleChange} required /></div>
          <button className="btn btn-primary" style={{ width: "100%" }} type="submit">Register</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;