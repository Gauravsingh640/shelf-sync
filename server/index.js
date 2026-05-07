const express = require("express");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const authMiddleWare = require("./middleware/auth.middleware");
const cors = require("cors");

databaseConnection();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://shelf-sync-mtq5.vercel.app/login",
  credentials: true
}));

app.use((req,res,next)=>{
   console.log(`${req.method} ${req.url}`);
   next();
})

app.get("/", (req,res)=>{
   res.send("Backend Running ✅");
})

app.use("/book", authMiddleWare, bookRouter);
app.use("/user", userRouter);

app.listen(8000, ()=>{
   console.log("Port listening on 8000 ✅");
});