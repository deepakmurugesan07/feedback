const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "supersecretkey";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", 
  database: "feedback_system_",
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Fill all fields" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
    res.json({ message: "User registered! Please login." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE username=?", [
      username,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: "1h" }
    );
    res.json({ username: user.username, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/feedbacks", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM feedbacks ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    console.error("Fetch Feedbacks Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/feedbacks", authMiddleware, async (req, res) => {
  try {
    const { customer_name, rating, comment, product } = req.body;

    if (!customer_name || !comment || !rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Invalid input (rating 1-5 required)" });
    }

    const date = new Date();

    await db.query(
      "INSERT INTO feedbacks (customer_name, rating, comment, product, date) VALUES (?, ?, ?, ?, ?)",
      [customer_name, rating, comment, product, date]
    );

    res.json({ message: "Feedback added successfully" });
  } catch (err) {
    console.error("Add Feedback Error:", err);
    res.status(500).json({ message: "DB insert failed" });
  }
});

app.listen(5000, () =>
  console.log(" Server running on http://localhost:5000")
);
