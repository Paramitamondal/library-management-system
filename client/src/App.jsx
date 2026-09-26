import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import Members from "./pages/admin/Members";
import Borrowings from "./pages/admin/Borrowings";
import BrowseBooks from "./pages/member/BrowseBooks";
import MyBorrowings from "./pages/member/MyBorrowings";

const HomeRoute = () => {
  const { user } = useAuth();
  return user?.role === "admin" ? <Dashboard /> : <BrowseBooks />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Layout><HomeRoute /></Layout></ProtectedRoute>} />
          <Route path="/books" element={<ProtectedRoute adminOnly><Layout><Books /></Layout></ProtectedRoute>} />
          <Route path="/members" element={<ProtectedRoute adminOnly><Layout><Members /></Layout></ProtectedRoute>} />
          <Route path="/borrowings" element={<ProtectedRoute adminOnly><Layout><Borrowings /></Layout></ProtectedRoute>} />
          <Route path="/my-borrowings" element={<ProtectedRoute><Layout><MyBorrowings /></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;