import Sidebar from "./Sidebar";
import AppNavbar from "./AppNavbar";

const Layout = ({ children }) => (
  <div className="app-shell">
    <Sidebar />
    <div className="main-area">
      <AppNavbar />
      <div className="page">{children}</div>
    </div>
  </div>
);

export default Layout;