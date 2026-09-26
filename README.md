# 📚 Library Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to digitize day-to-day library operations. The system helps librarians manage books, members, and borrowing activities through a centralized and role-based platform.

---

## ✨ Features

### 👨‍💼 Admin / Librarian

* Secure JWT-based authentication
* Add, edit, update, and deactivate books
* Manage book categories
* Search and filter books by title, author, ISBN, or category
* Register and manage library members
* Issue books to members
* Process book returns
* Automatic overdue fine calculation
* Real-time dashboard statistics

### 👤 Member

* Self-registration and secure login
* Browse available books
* Check live book availability
* View borrowing history
* Track due dates and fines
* View currently borrowed books

### ⚙️ Core System Features

* Role-Based Access Control (Admin & Member)
* Protected Routes
* Password Hashing with bcryptjs
* JWT Authentication
* RESTful API Architecture
* Automatic book availability tracking
* Responsive user interface
* Modular backend structure

---

## 🛠️ Tech Stack

| Layer             | Technology                          |
| ----------------- | ----------------------------------- |
| Frontend          | React.js, Vite, React Router, Axios |
| Backend           | Node.js, Express.js                 |
| Database          | MongoDB, Mongoose                   |
| Authentication    | JWT, bcryptjs                       |
| Version Control   | Git, GitHub                         |
| Development Tools | VS Code, Postman                    |

---

## 📂 Project Structure

```text
library-management-system/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   │       ├── admin/
│   │       └── member/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── books/
│   │   │   ├── members/
│   │   │   ├── borrowings/
│   │   │   ├── categories/
│   │   │   └── dashboard/
│   │   └── routes/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure the following software is installed on your system:

* Node.js (v18 or later)
* MongoDB (Local or Atlas)
* Git
* VS Code

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Paramitamondal/library-management-system.git
cd library-management-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library-management-system
JWT_SECRET=your_secret_key_here
```

Start the backend server:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Books

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/books     |
| POST   | /api/books     |
| PUT    | /api/books/:id |
| DELETE | /api/books/:id |

### Members

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /api/members |
| POST   | /api/members |

### Borrowings

| Method | Endpoint                   |
| ------ | -------------------------- |
| POST   | /api/borrowings/issue      |
| POST   | /api/borrowings/:id/return |

### Dashboard

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /api/dashboard/statistics |

---

## 👤 User Roles

### Admin

* Manage Books
* Manage Members
* Issue Books
* Return Books
* View Dashboard Statistics
* Manage Categories

### Member

* Browse Books
* View Personal Borrowings
* Track Due Dates
* Check Fines

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Authorization
* Secure REST API Access

---

## 📊 Dashboard Statistics

The Admin Dashboard displays:

* Total Books
* Available Books
* Borrowed Books
* Overdue Books
* Total Members

---

## 🔮 Future Enhancements

* Email Notifications
* Book Reservation System
* Analytics Dashboard with Charts
* Fine Payment Integration
* Book Reviews and Ratings
* PDF/Excel Report Export

---

## 👩‍💻 Author

**Paramita Mondal**

BCA Student | Full stack Developer | 

GitHub: https://github.com/Paramitamondal

---


