
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const authMiddleWare = require("./middleware/auth.middleware");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// CORS middleware - must be before routes
app.use(cors(corsOptions));

// Handle preflight requests (Express 5 compatible)
app.options(/.*/, cors(corsOptions));

// Body parser
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully ✅");
});

// Routes
app.use("/user", userRouter);
app.use("/book", authMiddleWare, bookRouter);

// Start server after database connection
const startServer = async () => {
  try {
    await databaseConnection();

    app.listen(8000, () => {
      console.log("Server running on http://localhost:8000 ✅");
    });
  } catch (error) {
    console.log("Server startup failed ❌", error.message);
    process.exit(1);
  }
};

startServer();
