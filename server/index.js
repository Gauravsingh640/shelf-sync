
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const authMiddleWare = require("./middleware/auth.middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://shelf-sync-iota.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header (e.g. Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("ShelfSync Backend Running Successfully 🚀");
});

app.use("/user", userRouter);
app.use("/book", authMiddleWare, bookRouter);

const startServer = async () => {
  try {
    await databaseConnection();

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.log("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
