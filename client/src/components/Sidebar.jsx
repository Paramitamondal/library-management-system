import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const adminLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/books", label: "Books" },
    { to: "/members", label: "Members" },
    { to: "/borrowings", label: "Borrowings" },
  ];
  const memberLinks = [
    { to: "/", label: "Browse Books" },
    { to: "/my-borrowings", label: "My Borrowed Books" },
  ];

  const links = user?.role === "admin" ? adminLinks : memberLinks;

  return (
    <div className="sidebar">
      <h2>📚 Library</h2>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          {l.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;