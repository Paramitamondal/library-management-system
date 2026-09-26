# 📚 Library Management System

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application to digitize day-to-day library operations — managing books, members, and borrowing/return activities through a centralized, role-based system.

---

## ✨ Features

### Admin / Librarian
- Secure JWT-based login
- Add, edit, and deactivate books with category management
- Search and filter books by title, author, ISBN, or category
- Register and manage library members
- Issue books to members and process returns
- Automatic fine calculation for overdue books
- Real-time dashboard with library statistics (total books, available copies, borrowed books, overdue count, total members)

### Member
- Self-registration and secure login
- Browse the full book catalog with live availability status
- View personal borrowing history and current borrowed books
- Track due dates and fines (if any)

### Core System Features
- Role-based access control (Admin vs Member) with protected routes
- Password hashing with bcrypt
- RESTful API architecture with a modular backend structure
- Automatic available-copy tracking on issue/return
- Responsive, clean dashboard-style UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Tools | Git, GitHub, Postman, VS Code |

---

## 📂 Project Structure