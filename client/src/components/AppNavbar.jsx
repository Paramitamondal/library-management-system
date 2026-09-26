import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <strong>Library Management System</strong>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <span>{user?.name} <span className="badge badge-muted">{user?.role}</span></span>
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AppNavbar;