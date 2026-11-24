# 📚 ShelfSync – Book Management System

A full-stack **MERN-based Book Management System** that allows users to securely manage their personal book collection with JWT authentication and complete CRUD (Create, Read, Update, Delete) functionality.

## 🚀 Live Demo

- 🌐 **Frontend:** [ShelfSync – Live App](https://shelf-sync-iota.vercel.app/)
- ⚙️ **Backend API:** [ShelfSync – Backend](https://shelf-sync-2.onrender.com/)

## ✨ Features

- 🔐 **User Authentication:** Secure signup and login using JWT.
- ➕ **Add Books:** Add new books with details such as name, title, author, price and publication date.
- 📖 **View Books:** Display and manage your book collection.
- ✏️ **Update Books:** Edit existing book information.
- 🗑️ **Delete Books:** Remove books from your collection.
- 🔒 **Protected Routes:** Restrict dashboard access to authenticated users.
- 🔑 **Password Security:** Hash passwords using bcrypt.
- 🔄 **RESTful APIs:** Backend APIs built with Express.js.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| API Handling | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcrypt |
| Deployment | Vercel, Render |

## 📁 Project Structure

```text
Shelf-sync/
│
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js backend
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── database.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Gauravsingh640/Shelf-sync.git

cd Shelf-sync
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Configure the frontend Axios base URL to point to your backend:

```javascript
http://localhost:8000
```

## 🌐 API Endpoints

### 🔐 Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/user/create` | Register a new user |
| POST | `/user/login` | Authenticate user |

### 📚 Book Management APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/book/booklists` | Fetch all books |
| POST | `/book/addbook` | Add a new book |
| PUT | `/book/updatebook` | Update book details |
| POST | `/book/deletebook` | Delete a book |

**Note:** Book management endpoints require a valid JWT Bearer token.

## 🔮 Future Improvements

- 📸 Book cover image uploads
- 🔍 Search and filter books
- 📊 Pagination for large collections
- 👤 User profile management
- 📚 Book categories and sorting

## 👨‍💻 Author

**Gaurav Singh**

- GitHub: [@Gauravsingh640](https://github.com/Gauravsingh640)
- LinkedIn: [Connect with me](https://linkedin.com/in/gauravsingh71205/)

## ⭐ Show Your Support

If you find ShelfSync useful, consider giving this repository a ⭐ on GitHub!

**Built with ❤️ by Gaurav Singh**
