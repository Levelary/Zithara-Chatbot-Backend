import express from "express";
import cors from "cors";
import { db } from "./utils/dbconfig";
import router from "./routes/index";
const app = express();

// Middleware for parsing JSON requests

app.use(express.json());

// Middleware for handling CORS

app.use(
  cors({
    origin: ["http://localhost:5173", "https://zithara-chatbot.vercel.app"],
    credentials: true,
  })
);
// Middleware for logging requests
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Connect to db
db.getConnection((err, connection) => {
  if (err) {
    console.log(err);
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

app.use("/api", router());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
